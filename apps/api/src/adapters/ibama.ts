import { CAMPOS_POR_SECAO } from '../../../packages/shared/catalogo_campos.js';
import { Adapter, AdapterContext, AdapterReturn, indisponivel } from '../types';

const CODIGOS = CAMPOS_POR_SECAO.Ambiental.map((campo) => campo.codigo);

const ibamaAdapter: Adapter = {
  async fetchByCNPJ({ env }: AdapterContext): Promise<AdapterReturn> {
    if (!env.IBAMA_BASE_URL || !env.IBAMA_TOKEN) {
      return {
        campos: CODIGOS.map((codigo) =>
          indisponivel(codigo, 'Configuração necessária: IBAMA_BASE_URL e IBAMA_TOKEN')
        ),
        pendencias: ['IBAMA_BASE_URL', 'IBAMA_TOKEN']
      };
    }

    return {
      campos: CODIGOS.map((codigo) =>
        indisponivel(
          codigo,
          'Integração com IBAMA/CTF ainda não implementada neste MVP para evitar dados incorretos'
        )
      )
    };
  }
};

export default ibamaAdapter;
