import { sanitizeCnpj } from '../utils/cnpj.js';
import { fetchGenericConnector } from './genericConnector.js';
import { ConnectorOutput } from './baseConnector.js';

const fieldKeys = ['prodes_area_desmatamento'] as const;

export const fetchProdes = async (cnpj: string): Promise<ConnectorOutput> => {
  const sanitized = sanitizeCnpj(cnpj);
  return fetchGenericConnector('prodes', sanitized, fieldKeys, (baseUrl, id) => `${baseUrl}?cnpj=${id}`);
};
