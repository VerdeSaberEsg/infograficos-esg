import { FieldFailure, FieldValue } from '../types/fields.js';
import { evidenceHash } from '../utils/hash.js';

export interface ConnectorOutput {
  successes: Record<string, FieldValue>;
  failures: Record<string, FieldFailure>;
  sourceUrl?: string;
}

export const buildIndisponivelFailure = (reason: string, httpStatus = 503): FieldFailure => ({
  reason,
  http_status: httpStatus,
  error: reason
});

export const buildValue = (
  value: string,
  sourceName: string,
  sourceUrl: string,
  httpStatus: number,
  fetchedAtIso: string,
  error?: string
): FieldValue => ({
  value: value.trim().replace(/\s+/g, ' '),
  source_name: sourceName,
  source_url: sourceUrl,
  fetched_at: fetchedAtIso,
  http_status: httpStatus,
  evidence_hash: evidenceHash(value, sourceUrl, fetchedAtIso),
  error
});
