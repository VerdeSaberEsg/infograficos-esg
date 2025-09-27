import { CampoMetadado } from './types.js';

type Catalogo = Record<string, CampoMetadado>;

const ambiental: CampoMetadado[] = [
  {
    codigo: 'E001',
    titulo: 'Número Inscrição CTF',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Qual o código de identificação da empresa no sistema ambiental?'
  },
  {
    codigo: 'E002',
    titulo: 'Status CTF',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'A empresa está registrada para atividades potencialmente poluidoras?'
  },
  {
    codigo: 'E003',
    titulo: 'Data Vencimento CTF',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Quando vence a obrigação ambiental?'
  },
  {
    codigo: 'E004',
    titulo: 'Categoria Atividade Principal',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Qual o tipo de atividade ambiental principal?'
  },
  {
    codigo: 'E005',
    titulo: 'Código Atividade CTF',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Qual o código específico da atividade?'
  },
  {
    codigo: 'E006',
    titulo: 'Descrição Atividade CTF',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Qual a descrição da atividade potencialmente poluidora?'
  },
  {
    codigo: 'E007',
    titulo: 'Porte Empreendimento',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Qual o porte do empreendimento ambiental?'
  },
  {
    codigo: 'E008',
    titulo: 'Potencial Poluidor',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Qual o risco ambiental da atividade principal?'
  },
  {
    codigo: 'E009',
    titulo: 'Grau Utilização Recursos',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Qual o grau de utilização de recursos naturais?'
  },
  {
    codigo: 'E010',
    titulo: 'Quantidade Atividades CTF',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Quantas atividades potencialmente poluidoras?'
  },
  {
    codigo: 'E011',
    titulo: 'Categoria TCFA (1-20)',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Qual a categoria para cálculo da taxa ambiental?'
  },
  {
    codigo: 'E012',
    titulo: 'Taxa TCFA Valor',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Quanto a empresa paga em taxas ambientais?'
  },
  {
    codigo: 'E013',
    titulo: 'Taxa TCFA Situação',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'A taxa ambiental está em dia?'
  },
  {
    codigo: 'E014',
    titulo: 'Data Última Declaração',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Quando foi feita a última declaração ambiental?'
  },
  {
    codigo: 'E015',
    titulo: 'Situação Última Declaração',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'IBAMA dadosabertos API',
    confiabilidade: 1.0,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 100,
    exemploTratamento: 'Normal',
    questaoNegocio: 'A declaração ambiental foi aceita?'
  },
  {
    codigo: 'E016',
    titulo: 'Participação COP',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'Declarado empresa',
    confiabilidade: 1.0,
    lgpdStatus: 'Declarado',
    linkConfidence: 100,
    exemploTratamento: 'Manual',
    questaoNegocio: 'A empresa participa ativamente de iniciativas climáticas globais?'
  },
  {
    codigo: 'E017',
    titulo: 'Emissões CO2 Declaradas',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'Declarado empresa',
    confiabilidade: 1.0,
    lgpdStatus: 'Declarado',
    linkConfidence: 100,
    exemploTratamento: 'Manual',
    questaoNegocio: 'Qual a pegada de carbono autodeclarada pela empresa?'
  },
  {
    codigo: 'E018',
    titulo: 'Certificações Ambientais',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'Declarado empresa',
    confiabilidade: 1.0,
    lgpdStatus: 'Declarado',
    linkConfidence: 100,
    exemploTratamento: 'Manual',
    questaoNegocio: 'Possui certificações ambientais reconhecidas internacionalmente?'
  },
  {
    codigo: 'E019',
    titulo: 'Compensação Carbono',
    secao: 'Ambiental',
    tipo: 'Direto',
    criterio: 'Declarado empresa',
    confiabilidade: 1.0,
    lgpdStatus: 'Declarado',
    linkConfidence: 100,
    exemploTratamento: 'Manual',
    questaoNegocio: 'A empresa realiza compensação de emissões de carbono?'
  }
];

const social: CampoMetadado[] = [
  {
    codigo: 'S001',
    titulo: 'Empregados Ativos',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Qual o tamanho atual da força de trabalho?'
  },
  {
    codigo: 'S002',
    titulo: 'Admissões Último Mês',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'A empresa está contratando ou demitindo?'
  },
  {
    codigo: 'S003',
    titulo: 'Demissões Último Mês',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Há sinais de dificuldades operacionais?'
  },
  {
    codigo: 'S004',
    titulo: 'Saldo Empregados',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Derivado',
    linkConfidence: 90,
    exemploTratamento: 'Calculado',
    questaoNegocio: 'A empresa está crescendo ou encolhendo?'
  },
  {
    codigo: 'S005',
    titulo: 'Taxa Rotatividade (%)',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Derivado',
    linkConfidence: 90,
    exemploTratamento: 'Calculado',
    questaoNegocio: 'A empresa está retendo ou perdendo talentos?'
  },
  {
    codigo: 'S006',
    titulo: 'Demissões Sem Justa Causa',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Quantas demissões foram por iniciativa da empresa?'
  },
  {
    codigo: 'S007',
    titulo: 'Demissões Por Iniciativa',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Quantos funcionários pediram demissão?'
  },
  {
    codigo: 'S008',
    titulo: 'Transferências Internas',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Há mobilidade interna de funcionários?'
  },
  {
    codigo: 'S009',
    titulo: 'Vínculos Temporários',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Quantos contratos temporários a empresa possui?'
  },
  {
    codigo: 'S010',
    titulo: 'Vínculos CLT',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Quantos funcionários CLT a empresa possui?'
  },
  {
    codigo: 'S011',
    titulo: 'Vínculos Estatutários',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Há funcionários estatutários (setor público)?'
  },
  {
    codigo: 'S012',
    titulo: 'Horas Extras Declaradas',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Quantas horas extras são trabalhadas mensalmente?'
  },
  {
    codigo: 'S013',
    titulo: 'Salário Médio Admitidos',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Qual a remuneração oferecida para novos funcionários?'
  },
  {
    codigo: 'S014',
    titulo: 'Salário Médio Desligados',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'A remuneração é um fator na rotatividade?'
  },
  {
    codigo: 'S015',
    titulo: 'Data Última Declaração',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE Novo CAGED API',
    confiabilidade: 0.9,
    lgpdStatus: 'Dados públicos',
    linkConfidence: 90,
    exemploTratamento: 'Normal',
    questaoNegocio: 'Quando foi feita a última declaração trabalhista?'
  },
  {
    codigo: 'S016',
    titulo: 'Empregados Masculino',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE RAIS API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Qual a distribuição de gênero na empresa?'
  },
  {
    codigo: 'S017',
    titulo: 'Empregados Feminino',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE RAIS API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'A empresa promove igualdade de gênero?'
  },
  {
    codigo: 'S018',
    titulo: 'Percentual Mulheres (%)',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE RAIS API',
    confiabilidade: 0.9,
    lgpdStatus: 'Derivado',
    linkConfidence: 90,
    exemploTratamento: 'Calculado',
    questaoNegocio: 'Qual o percentual de mulheres na força de trabalho?'
  },
  {
    codigo: 'S019',
    titulo: 'Empregados PCD',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE RAIS API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'A empresa cumpre cotas de inclusão de PCD?'
  },
  {
    codigo: 'S020',
    titulo: 'Percentual PCD (%)',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE RAIS API',
    confiabilidade: 0.9,
    lgpdStatus: 'Derivado',
    linkConfidence: 90,
    exemploTratamento: 'Calculado',
    questaoNegocio: 'Qual o percentual de pessoas com deficiência?'
  },
  {
    codigo: 'S021',
    titulo: 'Faixa Etária 18-24',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE RAIS API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Quantos jovens trabalham na empresa?'
  },
  {
    codigo: 'S022',
    titulo: 'Faixa Etária 25-39',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE RAIS API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Qual a faixa etária predominante?'
  },
  {
    codigo: 'S023',
    titulo: 'Faixa Etária 40+',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE RAIS API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'A empresa valoriza experiência de profissionais sêniores?'
  },
  {
    codigo: 'S024',
    titulo: 'Escolaridade Fundamental',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE RAIS API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Qual o nível educacional dos funcionários?'
  },
  {
    codigo: 'S025',
    titulo: 'Escolaridade Superior',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'MTE RAIS API',
    confiabilidade: 0.9,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 90,
    exemploTratamento: 'Hash salgado CPF',
    questaoNegocio: 'Quantos funcionários têm ensino superior?'
  },
  {
    codigo: 'S026',
    titulo: 'CIPA Constituída',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'CAGED + CNAE derivado',
    confiabilidade: 0.8,
    lgpdStatus: 'Derivado',
    linkConfidence: 80,
    exemploTratamento: 'Calculado obrigatório',
    questaoNegocio: 'A empresa cumpre obrigações legais de segurança?'
  },
  {
    codigo: 'S027',
    titulo: 'CIPA Efetiva',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'Derivado calculado',
    confiabilidade: 0.7,
    lgpdStatus: 'Derivado',
    linkConfidence: 70,
    exemploTratamento: 'Reuniões + atas',
    questaoNegocio: 'A CIPA funciona efetivamente na prática?'
  },
  {
    codigo: 'S028',
    titulo: 'Treinamento SST Horas',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'eSocial S-2240 API',
    confiabilidade: 1.0,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 100,
    exemploTratamento: 'Gov v2.5 XML/REST',
    questaoNegocio: 'Quantas horas de treinamento de segurança são oferecidas?'
  },
  {
    codigo: 'S029',
    titulo: 'Acidentes com CAT',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'eSocial S-2210 API',
    confiabilidade: 1.0,
    lgpdStatus: 'Anonimizado',
    linkConfidence: 100,
    exemploTratamento: 'Gov v2.5 XML/REST',
    questaoNegocio: 'Quantos acidentes de trabalho foram registrados?'
  },
  {
    codigo: 'S030',
    titulo: 'Taxa Afastamento',
    secao: 'Social',
    tipo: 'Direto',
    criterio: 'CAGED derivado',
    confiabilidade: 0.8,
    lgpdStatus: 'Derivado',
    linkConfidence: 80,
    exemploTratamento: 'Mensal calculado',
    questaoNegocio: 'Qual a taxa de afastamentos por problemas de saúde?'
  }
];

const governanca: CampoMetadado[] = [];
const compliance: CampoMetadado[] = [];

const catalogo = [...ambiental, ...social, ...governanca, ...compliance];

export const CATALOGO_CAMPOS: Catalogo = catalogo.reduce<Catalogo>((acc, campo) => {
  acc[campo.codigo] = campo;
  return acc;
}, {});

export const CAMPOS_POR_SECAO = {
  Ambiental: ambiental,
  Social: social,
  Governanca: governanca,
  Compliance: compliance
} as const;
