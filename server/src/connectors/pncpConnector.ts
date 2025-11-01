import { sanitizeCnpj } from '../utils/cnpj.js';
import { fetchGenericConnector } from './genericConnector.js';
import { ConnectorOutput } from './baseConnector.js';

const fieldKeys = [
  'pncp_licitacoes_vencidas',
  'pncp_contratos_vigentes',
  'pncp_valor_total_contratado',
  'pncp_orgao_maior_contratacao',
  'pncp_aditivos_quantidade',
  'pncp_sancoes_quantidade',
  'pncp_sancao_mais_grave'
] as const;

export const fetchPncp = async (cnpj: string): Promise<ConnectorOutput> => {
  const sanitized = sanitizeCnpj(cnpj);
  return fetchGenericConnector('pncp', sanitized, fieldKeys, (baseUrl, id) => `${baseUrl}?cnpj=${id}`);
};
