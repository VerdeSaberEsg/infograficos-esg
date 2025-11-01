import { sanitizeCnpj } from '../utils/cnpj.js';
import { fetchGenericConnector } from './genericConnector.js';
import { ConnectorOutput } from './baseConnector.js';

const fieldKeys = ['cndt_situacao', 'cndt_data_emissao'] as const;

export const fetchTstCndt = async (cnpj: string): Promise<ConnectorOutput> => {
  const sanitized = sanitizeCnpj(cnpj);
  return fetchGenericConnector('tst_cndt', sanitized, fieldKeys, (baseUrl, id) => `${baseUrl}?cnpj=${id}`);
};
