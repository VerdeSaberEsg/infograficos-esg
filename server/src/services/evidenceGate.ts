import { EvidenceGateOptions, FieldResult, FieldValue } from '../types/fields.js';

const isIsoDate = (value: string): boolean => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value);

const domainFromUrl = (url: string): string | null => {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
};

const isDomainAllowed = (hostname: string, allowDomains: readonly string[]): boolean =>
  allowDomains.some((domain) => hostname === domain.slice(1) || hostname.endsWith(domain));

const passesGate = (value: FieldValue, allowDomains: readonly string[]): boolean => {
  if (!value.source_url || !value.source_name) {
    return false;
  }
  const hostname = domainFromUrl(value.source_url);
  if (!hostname) {
    return false;
  }
  if (!isDomainAllowed(hostname, allowDomains)) {
    return false;
  }
  if (value.http_status < 200 || value.http_status >= 300) {
    return false;
  }
  if (!isIsoDate(value.fetched_at)) {
    return false;
  }
  if (!value.evidence_hash || value.evidence_hash.length !== 64) {
    return false;
  }
  const forbiddenTokens = ['lorem', 'ipsum', 'exemplo', 'placeholder', 'mock', 'stub', 'seed', 'foo', 'bar', 'baz', 'N/A', '—'];
  const lowerValue = value.value.toLowerCase();
  if (forbiddenTokens.some((token) => lowerValue.includes(token.toLowerCase()))) {
    return false;
  }
  return true;
};

export const applyEvidenceGate = (fields: FieldResult[], options: EvidenceGateOptions): FieldResult[] =>
  fields.map((field) => {
    if (!field.data) {
      return field;
    }
    const valid = passesGate(field.data, options.allowDomains);
    if (valid) {
      return field;
    }
    return {
      ...field,
      failure: {
        reason: 'indisponível',
        http_status: field.data.http_status,
        error: field.data.error ?? 'Dados não atendem aos critérios de evidência'
      },
      data: null
    };
  });
