import axios, { AxiosRequestConfig, Method } from 'axios';
import Bottleneck from 'bottleneck';
import NodeCache from 'node-cache';
import { allowlistedDomains } from '../config/env.js';

export interface HttpRequestOptions {
  url: string;
  method?: Method;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  data?: unknown;
  timeoutMs?: number;
  cacheTtlMs?: number;
  sourceKey: string;
}

interface CachedResponse<T> {
  status: number;
  data: T;
  headers: Record<string, string>;
  fetchedAt: string;
}

const limiterByHost = new Map<string, Bottleneck>();
const cache = new NodeCache();

const ensureAllowlisted = (url: URL) => {
  const hostname = url.hostname.toLowerCase();
  const allowed = allowlistedDomains.some((domain) => hostname === domain.slice(1) || hostname.endsWith(domain));
  if (!allowed) {
    throw new Error(`Host ${hostname} not in allowlist`);
  }
};

const limiterForHost = (host: string): Bottleneck => {
  if (!limiterByHost.has(host)) {
    limiterByHost.set(
      host,
      new Bottleneck({
        maxConcurrent: 3,
        reservoir: 60,
        reservoirRefreshAmount: 60,
        reservoirRefreshInterval: 60 * 1000
      })
    );
  }
  return limiterByHost.get(host)!;
};

const cacheKey = (config: HttpRequestOptions): string => {
  const { url, method = 'GET', params } = config;
  const serializedParams = params ? JSON.stringify(params) : '';
  return `${method}:${url}:${serializedParams}`;
};

export const httpRequest = async <T>(options: HttpRequestOptions): Promise<{ status: number; data: T; headers: Record<string, string>; fetchedAt: string }> => {
  const { url: rawUrl, method = 'GET', headers = {}, params, data, timeoutMs = 8000, cacheTtlMs } = options;
  const url = new URL(rawUrl);
  ensureAllowlisted(url);
  const host = url.hostname;
  const limiter = limiterForHost(host);
  const key = cacheKey(options);
  const cached = cache.get<CachedResponse<T>>(key);
  const requestHeaders: Record<string, string> = {
    ...headers,
    'User-Agent': 'esg-mvp/1.0 (+https://github.com/)' // generic UA
  };
  if (cached) {
    if (cached.headers.etag) {
      requestHeaders['If-None-Match'] = cached.headers.etag;
    }
    if (cached.headers['last-modified']) {
      requestHeaders['If-Modified-Since'] = cached.headers['last-modified'];
    }
  }
  const axiosConfig: AxiosRequestConfig = {
    url: rawUrl,
    method,
    params,
    data,
    headers: requestHeaders,
    timeout: timeoutMs,
    maxRedirects: 0,
    validateStatus: () => true
  };

  return limiter.schedule(async () => {
    const response = await axios.request(axiosConfig);
    const responseHeaders = Object.keys(response.headers).reduce<Record<string, string>>((acc, key) => {
      const value = response.headers[key];
      if (typeof value === 'string') {
        acc[key.toLowerCase()] = value;
      }
      return acc;
    }, {});
    if (response.status === 304 && cached) {
      return cached;
    }
    if (cacheTtlMs && response.status >= 200 && response.status < 300) {
      const payload: CachedResponse<T> = {
        status: response.status,
        data: response.data as T,
        headers: responseHeaders,
        fetchedAt: new Date().toISOString()
      };
      cache.set(key, payload, cacheTtlMs / 1000);
      return payload;
    }
    return {
      status: response.status,
      data: response.data as T,
      headers: responseHeaders,
      fetchedAt: new Date().toISOString()
    };
  });
};
