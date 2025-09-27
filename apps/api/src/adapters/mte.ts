import { CAMPOS_POR_SECAO } from '../../../packages/shared/catalogo_campos.js';
import { Adapter, AdapterContext, AdapterReturn, indisponivel } from '../types';

const CODIGOS = CAMPOS_POR_SECAO.Social.map((campo) => campo.codigo);

const mteAdapter: Adapter = {
  async fetchByCNPJ({ env }: AdapterContext): Promise<AdapterReturn> {
    const required = ['MTE_CAGED_BASE_URL', 'MTE_CAGED_TOKEN'];
    const missing = required.filter((key) => !env[key]);
    if (missing.length > 0) {
      return {
        campos: CODIGOS.map((codigo) =>
          indisponivel(codigo, 'Configuração necessária das credenciais do MTE/CAGED/RAIS')
        ),
        pendencias: missing
      };
    }

    return {
      campos: CODIGOS.map((codigo) =>
        indisponivel(
          codigo,
          'Integração com MTE (CAGED/RAIS) não concluída neste MVP para assegurar aderência regulatória'
        )
      )
    };
  }
};

export default mteAdapter;
