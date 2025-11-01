import { sanitizeCnpj } from '../utils/cnpj.js';
import { fetchGenericConnector } from './genericConnector.js';
import { ConnectorOutput } from './baseConnector.js';

const fieldKeys = [
  'caged_empregados_ativos',
  'caged_admissoes_12m',
  'caged_desligamentos_12m',
  'caged_saldo_12m'
] as const;

export const fetchCaged = async (cnpj: string): Promise<ConnectorOutput> => {
  const sanitized = sanitizeCnpj(cnpj);
  return fetchGenericConnector('caged', sanitized, fieldKeys, (baseUrl, id) => `${baseUrl}?cnpj=${id}`);
};
