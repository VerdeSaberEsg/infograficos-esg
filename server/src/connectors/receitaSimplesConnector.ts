import { sanitizeCnpj } from '../utils/cnpj.js';
import { fetchGenericConnector } from './genericConnector.js';
import { ConnectorOutput } from './baseConnector.js';

const fieldKeys = [
  'optante_simples',
  'data_opcao_simples',
  'data_exclusao_simples',
  'motivo_exclusao_simples',
  'optante_simei',
  'data_opcao_simei',
  'sublimite_icms'
] as const;

export const fetchReceitaSimples = async (cnpj: string): Promise<ConnectorOutput> => {
  const sanitized = sanitizeCnpj(cnpj);
  return fetchGenericConnector('receita_simples', sanitized, fieldKeys, (baseUrl, id) => `${baseUrl}/${id}`);
};
