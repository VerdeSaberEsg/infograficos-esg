import { describe, expect, it } from 'vitest';
import { isValidCnpj, sanitizeCnpj, applyCnpjMask } from '../utils/CNPJValidator';

describe('CNPJ utils (front)', () => {
  it('validates CNPJ', () => {
    expect(isValidCnpj('04.252.011/0001-10')).toBe(true);
  });

  it('rejects invalid', () => {
    expect(isValidCnpj('11.111.111/1111-11')).toBe(false);
  });

  it('sanitizes value', () => {
    expect(sanitizeCnpj('12.345.678/0001-90')).toBe('12345678000190');
  });

  it('applies mask', () => {
    expect(applyCnpjMask('12345678000190')).toBe('12.345.678/0001-90');
  });
});
