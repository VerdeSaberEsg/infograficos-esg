import { httpRequest } from '../utils/http.js';
import { ConnectorOutput, buildIndisponivelFailure, buildValue } from './baseConnector.js';
import { sourceByKey, SourceKey } from '../config/sources.js';

type FieldKey = string;

type JsonRecord = Record<string, unknown>;

export const fetchGenericConnector = async (
  key: SourceKey,
  cnpj: string,
  fieldKeys: readonly FieldKey[],
  buildUrl: (baseUrl: string, cnpj: string) => string
): Promise<ConnectorOutput> => {
  const source = sourceByKey.get(key);
  if (!source) {
    return { successes: {}, failures: {} };
  }
  const baseUrl = process.env[source.baseUrlEnvVar];
  if (!baseUrl) {
    const failures = fieldKeys.reduce<Record<string, ReturnType<typeof buildIndisponivelFailure>>>((acc, fieldKey) => {
      acc[fieldKey] = buildIndisponivelFailure('indisponível (endpoint não configurado)');
      return acc;
    }, {});
    return { successes: {}, failures };
  }
  const url = buildUrl(baseUrl.replace(/\/$/, ''), cnpj);
  try {
    const response = await httpRequest<JsonRecord>({
      url,
      sourceKey: key,
      timeoutMs: 8000,
      cacheTtlMs: (source.cacheTtlSeconds ?? 600) * 1000
    });
    if (response.status < 200 || response.status >= 300 || typeof response.data !== 'object') {
      const failures = fieldKeys.reduce<Record<string, ReturnType<typeof buildIndisponivelFailure>>>((acc, fieldKey) => {
        acc[fieldKey] = buildIndisponivelFailure('indisponível (resposta inválida)', response.status);
        return acc;
      }, {});
      return { successes: {}, failures };
    }
    const fetchedAt = response.fetchedAt;
    const data = response.data ?? {};
    const successes: Record<string, ReturnType<typeof buildValue>> = {};
    const failures: Record<string, ReturnType<typeof buildIndisponivelFailure>> = {};
    for (const fieldKey of fieldKeys) {
      const rawValue = data[fieldKey];
      if (typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean') {
        successes[fieldKey] = buildValue(String(rawValue), source.name, url, response.status, fetchedAt);
      } else {
        failures[fieldKey] = buildIndisponivelFailure('indisponível (campo ausente)', response.status);
      }
    }
    return { successes, failures };
  } catch (error) {
    const failures = fieldKeys.reduce<Record<string, ReturnType<typeof buildIndisponivelFailure>>>((acc, fieldKey) => {
      acc[fieldKey] = buildIndisponivelFailure('indisponível (erro na consulta)');
      return acc;
    }, {});
    return { successes: {}, failures };
  }
};
