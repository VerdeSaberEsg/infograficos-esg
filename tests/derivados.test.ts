import {
  derivarSaldoEmpregados,
  derivarTaxaRotatividade,
  derivarPercentualMulheres,
  derivarPercentualPCD
} from '../packages/shared/derivados';

describe('Derivados sociais', () => {
  it('deriva saldo entre admissões e demissões', () => {
    expect(derivarSaldoEmpregados(10, 4)).toBe(6);
  });

  it('calcula taxa de rotatividade percentual', () => {
    expect(derivarTaxaRotatividade(100, 10)).toBe(10);
  });

  it('calcula percentual de mulheres', () => {
    expect(derivarPercentualMulheres(40, 60)).toBe(40);
  });

  it('calcula percentual de PCD', () => {
    expect(derivarPercentualPCD(5, 200)).toBe(2.5);
  });
});
