import { sanitizeCnpj } from '../utils/cnpj.js';
import { fetchGenericConnector } from './genericConnector.js';
import { ConnectorOutput } from './baseConnector.js';

const fieldKeys = [
  'pgfn_inscricoes_quantidade',
  'pgfn_valor_total',
  'pgfn_situacao_predominante',
  'pgfn_parcelamentos_quantidade'
] as const;

export const fetchPgfn = async (cnpj: string): Promise<ConnectorOutput> => {
  const sanitized = sanitizeCnpj(cnpj);
  return fetchGenericConnector('pgfn', sanitized, fieldKeys, (baseUrl, id) => `${baseUrl}?cnpj=${id}`);
};
