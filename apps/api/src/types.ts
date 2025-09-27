import { CampoValorColetado } from '../../packages/shared/types.js';

export interface AdapterContext {
  cnpj: string;
  env: Record<string, string | undefined>;
}

export interface AdapterReturn {
  campos: CampoValorColetado[];
  pendencias?: string[];
}

export interface Adapter {
  fetchByCNPJ(ctx: AdapterContext): Promise<AdapterReturn>;
}

export const indisponivel = (codigo: string, motivo: string): CampoValorColetado => ({
  codigo,
  indisponivel: { motivo },
  coletadoEm: new Date().toISOString()
});
