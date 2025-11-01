import { describe, expect, it, beforeEach } from 'vitest';
import { performLookup } from '../services/lookupService.js';

const unset = (keys: string[]) => {
  keys.forEach((key) => {
    delete process.env[key];
  });
};

describe('Lookup without configuration', () => {
  beforeEach(() => {
    unset([
      'RECEITA_CNPJ_URL',
      'RECEITA_SIMPLES_URL',
      'PNCP_URL',
      'PGFN_URL',
      'TST_CNDT_URL',
      'RECEITA_CND_URL',
      'CAIXA_CRF_URL',
      'CAGED_URL',
      'RAIS_URL',
      'MTE_URL',
      'IBAMA_URL',
      'ICMBIO_URL',
      'SINAFLOR_URL',
      'CTF_URL',
      'PRODES_URL'
    ]);
  });

  it('returns failures for all fields', async () => {
    const response = await performLookup('04252011000110');
    response.fields.forEach((field) => {
      expect(field.data).toBeNull();
      expect(field.failure?.reason).toContain('indisponível');
    });
  });
});
