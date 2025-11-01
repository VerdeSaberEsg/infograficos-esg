import { describe, expect, it } from 'vitest';
import { isValidCnpj, sanitizeCnpj, formatCnpjMask } from '../utils/cnpj.js';

describe('CNPJ utilities', () => {
  it('validates known valid CNPJ', () => {
    expect(isValidCnpj('04.252.011/0001-10')).toBe(true);
  });

  it('rejects invalid pattern', () => {
    expect(isValidCnpj('00000000000000')).toBe(false);
  });

  it('sanitizes non digits', () => {
    expect(sanitizeCnpj('12.345.678/0001-90')).toBe('12345678000190');
  });

  it('formats mask', () => {
    expect(formatCnpjMask('12345678000190')).toBe('12.345.678/0001-90');
  });
});
