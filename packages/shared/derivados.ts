import { CampoValorColetado } from './types.js';

type Numeric = number | string;

const parseNumber = (value: Numeric | undefined): number | undefined => {
  if (value === undefined) return undefined;
  const num = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(num) ? num : undefined;
};

export function derivarSaldoEmpregados(admissoes?: Numeric, demissoes?: Numeric): CampoValorColetado['valor'] {
  const adm = parseNumber(admissoes);
  const dem = parseNumber(demissoes);
  if (adm === undefined || dem === undefined) return undefined;
  return adm - dem;
}

export function derivarTaxaRotatividade(empregadosAtivos?: Numeric, demissoes?: Numeric): CampoValorColetado['valor'] {
  const ativos = parseNumber(empregadosAtivos);
  const dem = parseNumber(demissoes);
  if (!ativos || dem === undefined) return undefined;
  return Number(((dem / ativos) * 100).toFixed(2));
}

export function derivarPercentualMulheres(feminino?: Numeric, masculino?: Numeric): CampoValorColetado['valor'] {
  const fem = parseNumber(feminino);
  const masc = parseNumber(masculino);
  if (fem === undefined || masc === undefined) return undefined;
  const total = fem + masc;
  if (total <= 0) return undefined;
  return Number(((fem / total) * 100).toFixed(2));
}

export function derivarPercentualPCD(pcd?: Numeric, empregados?: Numeric): CampoValorColetado['valor'] {
  const pcdNum = parseNumber(pcd);
  const total = parseNumber(empregados);
  if (pcdNum === undefined || total === undefined || total <= 0) return undefined;
  return Number(((pcdNum / total) * 100).toFixed(2));
}
