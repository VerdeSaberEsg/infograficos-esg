import { normalizeCNPJ, isValidCNPJ } from '../../../packages/shared/cnpj.js';
import { CATALOGO_CAMPOS } from '../../../packages/shared/catalogo_campos.js';
import { CampoComMetadado, CampoValorColetado, PainelEmpresa } from '../../../packages/shared/types.js';
import {
  derivarPercentualMulheres,
  derivarPercentualPCD,
  derivarSaldoEmpregados,
  derivarTaxaRotatividade
} from '../../../packages/shared/derivados.js';
import rfbAdapter from '../adapters/rfb';
import ibamaAdapter from '../adapters/ibama';
import mteAdapter from '../adapters/mte';
import esocialAdapter from '../adapters/esocial';
import cguAdapter from '../adapters/cgu';
import cnjAdapter from '../adapters/cnj';
import cvmAdapter from '../adapters/cvm';
import pncpAdapter from '../adapters/pncp';
import caixaAdapter from '../adapters/caixa';
import pgfnAdapter from '../adapters/pgfn';
import mdicAdapter from '../adapters/mdic';
import tseAdapter from '../adapters/tse';
import transparenciaAdapter from '../adapters/transparencia';
import ambientaisAdapter from '../adapters/ambientais_estaduais';
import { Adapter, AdapterReturn, indisponivel } from '../types';

const ADAPTERS: Adapter[] = [
  rfbAdapter,
  ibamaAdapter,
  mteAdapter,
  esocialAdapter,
  cguAdapter,
  cnjAdapter,
  cvmAdapter,
  pncpAdapter,
  caixaAdapter,
  pgfnAdapter,
  mdicAdapter,
  tseAdapter,
  transparenciaAdapter,
  ambientaisAdapter
];

export interface PainelAgregado {
  painel: PainelEmpresa;
  pendencias: string[];
}

export async function obterPainelEmpresa(cnpjEntrada: string): Promise<PainelAgregado> {
  const normalizado = normalizeCNPJ(cnpjEntrada);
  if (!isValidCNPJ(normalizado)) {
    throw new Error('CNPJ inválido');
  }

  const env = { ...process.env };
  const resultados = await Promise.allSettled(
    ADAPTERS.map((adapter) =>
      adapter.fetchByCNPJ({
        cnpj: normalizado,
        env
      })
    )
  );

  const pendencias = new Set<string>();
  const valores = new Map<string, CampoValorColetado>();

  for (const campoCodigo of Object.keys(CATALOGO_CAMPOS)) {
    valores.set(
      campoCodigo,
      indisponivel(campoCodigo, 'Sem dados coletados da fonte oficial no momento')
    );
  }

  const merge = (retorno: AdapterReturn) => {
    retorno.pendencias?.forEach((pendencia) => pendencias.add(pendencia));
    retorno.campos.forEach((campo) => {
      if (!campo.coletadoEm) {
        campo.coletadoEm = new Date().toISOString();
      }
      valores.set(campo.codigo, campo);
    });
  };

  resultados.forEach((resultado) => {
    if (resultado.status === 'fulfilled') {
      merge(resultado.value);
    } else {
      // manter indisponibilidade padrão
    }
  });

  aplicarDerivados(valores);

  const campos: CampoComMetadado[] = (Object.values(CATALOGO_CAMPOS) as CampoComMetadado[]).map(
    (meta) => ({
      ...meta,
      dado:
        valores.get(meta.codigo) ??
        indisponivel(meta.codigo, 'Sem dados coletados da fonte oficial no momento')
    })
  );

  const painel: PainelEmpresa = {
    cnpj: normalizado,
    campos
  };

  return {
    painel,
    pendencias: Array.from(pendencias)
  };
}

export async function avaliarPendenciasAmbiente(): Promise<string[]> {
  const env = { ...process.env };
  const pendencias = new Set<string>();
  await Promise.allSettled(
    ADAPTERS.map((adapter) =>
      adapter.fetchByCNPJ({
        cnpj: '00000000000000',
        env
      })
    )
  ).then((resultados) => {
    resultados.forEach((resultado) => {
      if (resultado.status === 'fulfilled') {
        resultado.value.pendencias?.forEach((pendencia) => pendencias.add(pendencia));
      }
    });
  });
  return Array.from(pendencias);
}

function aplicarDerivados(valores: Map<string, CampoValorColetado>): void {
  const obterValor = (codigo: string): CampoValorColetado | undefined => valores.get(codigo);

  const s002 = obterValor('S002');
  const s003 = obterValor('S003');
  const saldo = derivarSaldoEmpregados(s002?.valor, s003?.valor);
  if (saldo !== undefined) {
    valores.set('S004', {
      codigo: 'S004',
      valor: saldo,
      coletadoEm: new Date().toISOString()
    });
  }

  const s001 = obterValor('S001');
  const rotatividade = derivarTaxaRotatividade(s001?.valor, s003?.valor);
  if (rotatividade !== undefined) {
    valores.set('S005', {
      codigo: 'S005',
      valor: rotatividade,
      coletadoEm: new Date().toISOString()
    });
  }

  const s016 = obterValor('S016');
  const s017 = obterValor('S017');
  const percMulheres = derivarPercentualMulheres(s017?.valor, s016?.valor);
  if (percMulheres !== undefined) {
    valores.set('S018', {
      codigo: 'S018',
      valor: percMulheres,
      coletadoEm: new Date().toISOString()
    });
  }

  const s019 = obterValor('S019');
  const percPCD = derivarPercentualPCD(s019?.valor, s001?.valor);
  if (percPCD !== undefined) {
    valores.set('S020', {
      codigo: 'S020',
      valor: percPCD,
      coletadoEm: new Date().toISOString()
    });
  }
}
