import { describe, expect, it } from 'vitest';
import { applyEvidenceGate } from '../services/evidenceGate.js';
import { FieldResult } from '../types/fields.js';

const baseField: FieldResult = {
  id: 1,
  key: 'test',
  label: 'Campo teste',
  section: 'CORE',
  group: 'A1',
  sourceKey: 'receita_cnpj',
  data: {
    value: 'valor real',
    source_name: 'Fonte Oficial',
    source_url: 'https://dados.gov.br/exemplo',
    fetched_at: '2024-01-01T00:00:00.000Z',
    http_status: 200,
    evidence_hash: 'a'.repeat(64)
  }
};

describe('Evidence gate', () => {
  it('keeps valid field', () => {
    const [result] = applyEvidenceGate([baseField], { allowDomains: ['.gov.br'] });
    expect(result.data).not.toBeNull();
  });

  it('blocks invalid host', () => {
    const [result] = applyEvidenceGate(
      [
        {
          ...baseField,
          data: {
            ...baseField.data!,
            source_url: 'https://example.com/dado'
          }
        }
      ],
      { allowDomains: ['.gov.br'] }
    );
    expect(result.data).toBeNull();
    expect(result.failure?.reason).toBe('indisponível');
  });

  it('blocks forbidden tokens', () => {
    const [result] = applyEvidenceGate(
      [
        {
          ...baseField,
          data: {
            ...baseField.data!,
            value: 'lorem teste'
          }
        }
      ],
      { allowDomains: ['.gov.br'] }
    );
    expect(result.data).toBeNull();
  });
});
