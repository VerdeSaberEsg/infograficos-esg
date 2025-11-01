import { fieldDefinitions, SCHEMA_VERSION } from './fields.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { LookupResponse } from '../types/fields.js';

export const lookupResponseSchema = {
  $id: 'https://infograficos-esg.dev/schemas/lookup-response.json',
  type: 'object',
  properties: {
    cnpj: { type: 'string', pattern: '^\\d{14}$' },
    schema_version: { type: 'string', const: SCHEMA_VERSION },
    fetched_at: { type: 'string', format: 'date-time' },
    metrics: { type: 'object' },
    fields: {
      type: 'array',
      minItems: fieldDefinitions.length,
      maxItems: fieldDefinitions.length,
      items: fieldDefinitions.map((definition) => ({
        type: 'object',
        properties: {
          id: { type: 'integer', const: definition.id },
          key: { type: 'string', const: definition.key },
          label: { type: 'string' },
          section: { type: 'string' },
          group: { type: 'string' },
          sourceKey: { type: 'string' },
          data: {
            anyOf: [
              { type: 'null' },
              {
                type: 'object',
                properties: {
                  value: { type: 'string' },
                  source_name: { type: 'string' },
                  source_url: { type: 'string', format: 'uri' },
                  fetched_at: { type: 'string', format: 'date-time' },
                  http_status: { type: 'integer' },
                  evidence_hash: { type: 'string', pattern: '^[a-f0-9]{64}$' },
                  error: { type: 'string', nullable: true }
                },
                required: ['value', 'source_name', 'source_url', 'fetched_at', 'http_status', 'evidence_hash'],
                additionalProperties: false
              }
            ]
          },
          failure: {
            anyOf: [
              { type: 'null' },
              {
                type: 'object',
                properties: {
                  reason: { type: 'string' },
                  http_status: { type: 'integer', nullable: true },
                  error: { type: 'string', nullable: true }
                },
                required: ['reason'],
                additionalProperties: false
              }
            ]
          }
        },
        required: ['id', 'key', 'label', 'section', 'group', 'sourceKey', 'data'],
        additionalProperties: false
      }))
    }
  },
  required: ['cnpj', 'schema_version', 'fetched_at', 'fields', 'metrics'],
  additionalProperties: false
};

const AjvConstructor = Ajv as unknown as new (options?: Record<string, unknown>) => {
  compile<T>(schema: unknown): (payload: T) => boolean;
  errorsText(errors?: unknown): string;
};
const addFormatsFn = addFormats as unknown as (instance: { [key: string]: unknown }) => void;

const ajv = new AjvConstructor({ allErrors: true, strict: false });
addFormatsFn(ajv);
const validate = ajv.compile<LookupResponse>(lookupResponseSchema as unknown);

export const validateLookupResponse = (payload: LookupResponse): void => {
  const valid = validate(payload);
  if (!valid) {
    const errors = (validate as unknown as { errors?: unknown }).errors;
    const errorText = (ajv as unknown as { errorsText?: (errors?: unknown) => string }).errorsText?.(errors) ??
      'Dados não aderem ao schema';
    throw new Error(`Lookup response inválida: ${errorText}`);
  }
};
