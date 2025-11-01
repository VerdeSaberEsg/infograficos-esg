import { sanitizeCnpj } from '../utils/cnpj.js';
import { fetchGenericConnector } from './genericConnector.js';
import { ConnectorOutput } from './baseConnector.js';

const fieldKeys = ['sinaflor_registro'] as const;

export const fetchSinaflor = async (cnpj: string): Promise<ConnectorOutput> => {
  const sanitized = sanitizeCnpj(cnpj);
  return fetchGenericConnector('sinflor', sanitized, fieldKeys, (baseUrl, id) => `${baseUrl}?cnpj=${id}`);
};
