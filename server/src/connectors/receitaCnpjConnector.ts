import { sanitizeCnpj } from '../utils/cnpj.js';
import { httpRequest } from '../utils/http.js';
import { ConnectorOutput, buildIndisponivelFailure, buildValue } from './baseConnector.js';
import { sourceByKey } from '../config/sources.js';

const fieldKeys = [
  'razao_social',
  'nome_fantasia',
  'data_abertura',
  'situacao_cadastral',
  'data_situacao_cadastral',
  'motivo_situacao_cadastral',
  'cnae_principal',
  'descricao_cnae_principal',
  'natureza_juridica',
  'capital_social',
  'porte_empresa',
  'matriz_filial',
  'data_inicio_atividade',
  'tipo_logradouro',
  'logradouro',
  'numero',
  'complemento',
  'bairro',
  'cep',
  'municipio',
  'uf',
  'ddd_telefone_1',
  'telefone_1',
  'email',
  'socio_1_nome',
  'socio_1_qualificacao',
  'socio_1_cpf',
  'socio_1_data_entrada',
  'socio_2_nome',
  'socio_2_qualificacao',
  'socio_2_cpf',
  'socio_2_data_entrada'
] as const;

type ReceitaResponse = Partial<Record<(typeof fieldKeys)[number], string>>;

export const fetchReceitaCnpj = async (cnpj: string): Promise<ConnectorOutput> => {
  const sanitized = sanitizeCnpj(cnpj);
  const source = sourceByKey.get('receita_cnpj');
  if (!source) {
    return { successes: {}, failures: {} };
  }
  const baseUrl = process.env[source.baseUrlEnvVar];
  if (!baseUrl) {
    const failures = fieldKeys.reduce<Record<string, ReturnType<typeof buildIndisponivelFailure>>>((acc, key) => {
      acc[key] = buildIndisponivelFailure('indisponível (endpoint não configurado)');
      return acc;
    }, {});
    return { successes: {}, failures };
  }
  const url = `${baseUrl.replace(/\/$/, '')}/${sanitized}`;
  try {
    const response = await httpRequest<ReceitaResponse>({
      url,
      sourceKey: 'receita_cnpj',
      timeoutMs: 8000,
      cacheTtlMs: (source.cacheTtlSeconds ?? 600) * 1000
    });
    if (response.status < 200 || response.status >= 300 || typeof response.data !== 'object') {
      const failures = fieldKeys.reduce<Record<string, ReturnType<typeof buildIndisponivelFailure>>>((acc, key) => {
        acc[key] = buildIndisponivelFailure('indisponível (resposta inválida)', response.status);
        return acc;
      }, {});
      return { successes: {}, failures };
    }
    const fetchedAt = response.fetchedAt;
    const successes: Record<string, ReturnType<typeof buildValue>> = {};
    const failures: Record<string, ReturnType<typeof buildIndisponivelFailure>> = {};
    for (const key of fieldKeys) {
      const rawValue = response.data?.[key];
      if (rawValue && rawValue.toString().trim() !== '') {
        successes[key] = buildValue(
          String(rawValue),
          source.name,
          url,
          response.status,
          fetchedAt
        );
      } else {
        failures[key] = buildIndisponivelFailure('indisponível (campo ausente)', response.status);
      }
    }
    return { successes, failures };
  } catch (error) {
    const failures = fieldKeys.reduce<Record<string, ReturnType<typeof buildIndisponivelFailure>>>((acc, key) => {
      acc[key] = buildIndisponivelFailure('indisponível (erro na consulta)');
      return acc;
    }, {});
    return { successes: {}, failures };
  }
};
