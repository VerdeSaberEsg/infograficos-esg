import crypto from 'node:crypto';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const canonicalize = (value: JsonValue): string => {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalize(item)).join(',')}]`;
  }
  const entries = Object.entries(value)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => `${JSON.stringify(key)}:${canonicalize(val)}`);
  return `{${entries.join(',')}}`;
};

export const canonicalJson = (value: JsonValue): string => canonicalize(value);

export const evidenceHash = (value: JsonValue, sourceUrl: string, fetchedAt: string): string => {
  const canonicalValue = canonicalJson(value);
  const payload = `${canonicalValue}||${sourceUrl}||${fetchedAt}`;
  return crypto.createHash('sha256').update(payload).digest('hex');
};
