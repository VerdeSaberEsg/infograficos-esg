const BLACKLIST = new Set([
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999'
]);

export function normalizeCNPJ(input: string): string {
  return input.replace(/\D+/g, '');
}

export function isValidCNPJ(raw: string): boolean {
  const digits = normalizeCNPJ(raw);
  if (digits.length !== 14 || BLACKLIST.has(digits)) {
    return false;
  }
  const calcCheck = (slice: number) => {
    const numbers = digits.substring(0, slice);
    let factor = slice - 7;
    let total = 0;
    for (const char of numbers) {
      total += Number(char) * factor--;
      if (factor < 2) factor = 9;
    }
    const result = 11 - (total % 11);
    return result > 9 ? 0 : result;
  };
  const digit1 = calcCheck(12);
  const digit2 = calcCheck(13);
  return digit1 === Number(digits.charAt(12)) && digit2 === Number(digits.charAt(13));
}

export function formatCNPJ(raw: string): string {
  const digits = normalizeCNPJ(raw);
  if (digits.length !== 14) return digits;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}
