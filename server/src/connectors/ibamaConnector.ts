import { sanitizeCnpj } from '../utils/cnpj.js';
import { fetchGenericConnector } from './genericConnector.js';
import { ConnectorOutput } from './baseConnector.js';

const fieldKeys = [
  'ibama_autos_infracao',
  'ibama_valor_multas',
  'ibama_embargos_ativos',
  'ibama_regularidade',
  'licenca_ambiental_possui',
  'licenca_ambiental_tipo',
  'licenca_ambiental_validade'
] as const;

export const fetchIbama = async (cnpj: string): Promise<ConnectorOutput> => {
  const sanitized = sanitizeCnpj(cnpj);
  return fetchGenericConnector('ibama', sanitized, fieldKeys, (baseUrl, id) => `${baseUrl}?cnpj=${id}`);
};
