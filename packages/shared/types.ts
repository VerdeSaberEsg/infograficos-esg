export type CampoCodigo = string;

export interface CampoMetadado {
  codigo: CampoCodigo;
  titulo: string;
  secao: 'Ambiental' | 'Social' | 'Governanca' | 'Compliance';
  tipo: string;
  criterio: string;
  confiabilidade: number;
  lgpdStatus: string;
  linkConfidence: number;
  exemploTratamento: string;
  questaoNegocio: string;
}

export interface CampoValorColetado {
  codigo: CampoCodigo;
  valor?: string | number | boolean | null;
  indisponivel?: {
    motivo: string;
  };
  fonte?: {
    nome: string;
    url?: string;
  };
  coletadoEm: string;
}

export interface CampoComMetadado extends CampoMetadado {
  dado: CampoValorColetado;
}

export interface PainelEmpresa {
  cnpj: string;
  campos: CampoComMetadado[];
}
