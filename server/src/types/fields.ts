export type FieldSection = 'CORE' | 'GOVERNANCA' | 'SOCIAL' | 'AMBIENTAL';

export type FieldGroupKey =
  | 'A1'
  | 'A2'
  | 'A3'
  | 'A4'
  | 'B1'
  | 'B2'
  | 'C'
  | 'D';

export interface FieldDefinition {
  id: number;
  key: string;
  label: string;
  section: FieldSection;
  group: FieldGroupKey;
  sourceKey: string;
}

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

export interface FieldResult extends FieldDefinition {
  data: FieldValue | null;
  failure?: FieldFailure;
}

export interface LookupResponse {
  cnpj: string;
  schema_version: string;
  fetched_at: string;
  fields: FieldResult[];
  metrics: Record<string, unknown>;
}

export interface EvidenceGateOptions {
  allowDomains: readonly string[];
}
