import { sanitizeCnpj } from '../utils/cnpj.js';
import { fetchGenericConnector } from './genericConnector.js';
import { ConnectorOutput } from './baseConnector.js';

const fieldKeys = ['crf_situacao', 'crf_validade'] as const;

export const fetchCaixaCrf = async (cnpj: string): Promise<ConnectorOutput> => {
  const sanitized = sanitizeCnpj(cnpj);
  return fetchGenericConnector('caixa_crf', sanitized, fieldKeys, (baseUrl, id) => `${baseUrl}?cnpj=${id}`);
};
