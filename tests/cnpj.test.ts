import { formatCNPJ, isValidCNPJ, normalizeCNPJ } from '../packages/shared/cnpj';

describe('CNPJ utilities', () => {
  it('normalizes input removing non-digits', () => {
    expect(normalizeCNPJ('12.345.678/0001-90')).toBe('12345678000190');
  });

  it('formats digits into standard mask', () => {
    expect(formatCNPJ('12345678000190')).toBe('12.345.678/0001-90');
  });

  it('validates official checksum', () => {
    expect(isValidCNPJ('12.544.992/0001-05')).toBe(true);
    expect(isValidCNPJ('11.111.111/1111-11')).toBe(false);
  });
});
