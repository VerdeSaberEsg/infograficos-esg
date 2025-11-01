export interface FieldValue {
  value: string;
  source_name: string;
  source_url: string;
  fetched_at: string;
  http_status: number;
  evidence_hash: string;
  error?: string;
}

export interface FieldFailure {
  reason: string;
  http_status?: number;
  error?: string;
}

export interface FieldResult {
  id: number;
  key: string;
  label: string;
  section: 'CORE' | 'GOVERNANCA' | 'SOCIAL' | 'AMBIENTAL';
  group: string;
  sourceKey: string;
  data: FieldValue | null;
  failure?: FieldFailure;
}

export interface LookupResponse {
  cnpj: string;
  schema_version: string;
  fetched_at: string;
  metrics: Record<string, unknown>;
  fields: FieldResult[];
}

export type AlertStatus = 'ok' | 'irregular' | 'desconhecido';
