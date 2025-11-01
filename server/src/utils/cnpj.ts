const WEIGHTS_FIRST_DIGIT = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const WEIGHTS_SECOND_DIGIT = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

export const sanitizeCnpj = (value: string): string => value.replace(/\D+/g, '');

const calculateDigit = (numbers: number[], weights: number[]): number => {
  const sum = numbers.reduce((acc, num, index) => acc + num * weights[index], 0);
  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
};

export const isValidCnpj = (cnpj: string): boolean => {
  const sanitized = sanitizeCnpj(cnpj);
  if (sanitized.length !== 14) {
    return false;
  }
  if (/^(\d)\1{13}$/.test(sanitized)) {
    return false;
  }
  const digits = sanitized.split('').map((d) => Number.parseInt(d, 10));
  const firstDigit = calculateDigit(digits.slice(0, 12), WEIGHTS_FIRST_DIGIT);
  const secondDigit = calculateDigit(digits.slice(0, 13), WEIGHTS_SECOND_DIGIT);
  return firstDigit === digits[12] && secondDigit === digits[13];
};

export const formatCnpjMask = (cnpj: string): string => {
  const sanitized = sanitizeCnpj(cnpj);
  return sanitized.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};
