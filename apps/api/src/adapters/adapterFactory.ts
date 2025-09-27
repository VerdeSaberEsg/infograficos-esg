import { Adapter, AdapterReturn } from '../types.js';

export const createPendingAdapter = (
  codigos: string[],
  pendencias: string[],
  motivo: string
): Adapter => ({
  async fetchByCNPJ(): Promise<AdapterReturn> {
    const agora = new Date().toISOString();
    return {
      campos: codigos.map((codigo) => ({
        codigo,
        indisponivel: { motivo },
        coletadoEm: agora
      })),
      pendencias
    };
  }
});
