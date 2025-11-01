export type SourceKey =
  | 'receita_cnpj'
  | 'receita_simples'
  | 'pncp'
  | 'pgfn'
  | 'tst_cndt'
  | 'receita_cnd'
  | 'caixa_crf'
  | 'caged'
  | 'rais'
  | 'mte'
  | 'ibama'
  | 'icmbio'
  | 'sinflor'
  | 'ctf'
  | 'prodes';

export type SourceConfiguration = {
  key: SourceKey;
  name: string;
  baseUrlEnvVar: string;
  rateLimitPerMinute?: number;
  concurrency?: number;
  cacheTtlSeconds?: number;
};

export const sources: SourceConfiguration[] = [
  { key: 'receita_cnpj', name: 'Receita Federal - Cadastro CNPJ', baseUrlEnvVar: 'RECEITA_CNPJ_URL', cacheTtlSeconds: 600 },
  { key: 'receita_simples', name: 'Receita Federal - Simples Nacional', baseUrlEnvVar: 'RECEITA_SIMPLES_URL', cacheTtlSeconds: 600 },
  { key: 'pncp', name: 'Portal Nacional de Contratações Públicas', baseUrlEnvVar: 'PNCP_URL', cacheTtlSeconds: 600 },
  { key: 'pgfn', name: 'PGFN Regularize', baseUrlEnvVar: 'PGFN_URL', cacheTtlSeconds: 600 },
  { key: 'tst_cndt', name: 'Tribunal Superior do Trabalho - CNDT', baseUrlEnvVar: 'TST_CNDT_URL', cacheTtlSeconds: 600 },
  { key: 'receita_cnd', name: 'Receita Federal - Certidões', baseUrlEnvVar: 'RECEITA_CND_URL', cacheTtlSeconds: 600 },
  { key: 'caixa_crf', name: 'Caixa Econômica Federal - CRF', baseUrlEnvVar: 'CAIXA_CRF_URL', cacheTtlSeconds: 600 },
  { key: 'caged', name: 'CAGED', baseUrlEnvVar: 'CAGED_URL', cacheTtlSeconds: 600 },
  { key: 'rais', name: 'RAIS', baseUrlEnvVar: 'RAIS_URL', cacheTtlSeconds: 600 },
  { key: 'mte', name: 'Ministério do Trabalho', baseUrlEnvVar: 'MTE_URL', cacheTtlSeconds: 600 },
  { key: 'ibama', name: 'IBAMA', baseUrlEnvVar: 'IBAMA_URL', cacheTtlSeconds: 600 },
  { key: 'icmbio', name: 'ICMBio', baseUrlEnvVar: 'ICMBIO_URL', cacheTtlSeconds: 600 },
  { key: 'sinflor', name: 'SINAFLOR', baseUrlEnvVar: 'SINAFLOR_URL', cacheTtlSeconds: 600 },
  { key: 'ctf', name: 'Cadastro Técnico Federal', baseUrlEnvVar: 'CTF_URL', cacheTtlSeconds: 600 },
  { key: 'prodes', name: 'PRODES', baseUrlEnvVar: 'PRODES_URL', cacheTtlSeconds: 600 }
];

export const sourceByKey = new Map(sources.map((source) => [source.key, source] as const));
