'use client';

import { useMemo } from 'react';
import cls from './ui.module.css';
import Badge from './Badge';
import KeyValue from './KeyValue';
import type { CampoComMetadado } from '../../../packages/shared/types.js';

interface FieldRowProps {
  campo: CampoComMetadado;
}

function formatValue(campo: CampoComMetadado): string {
  if (campo.dado.indisponivel) {
    return `Não disponível — ${campo.dado.indisponivel.motivo}`;
  }
  if (campo.dado.valor === null || campo.dado.valor === undefined || campo.dado.valor === '') {
    return 'Não disponível';
  }
  return String(campo.dado.valor);
}

export default function FieldRow({ campo }: FieldRowProps) {
  const dataColeta = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(campo.dado.coletadoEm));
    } catch (error) {
      return campo.dado.coletadoEm;
    }
  }, [campo.dado.coletadoEm]);

  return (
    <div className={cls.row} role="listitem">
      <div className={cls.rowHeader}>
        <span className={cls.label}>{campo.titulo}</span>
        <span className={cls.value}>{formatValue(campo)}</span>
      </div>
      <div className={cls.meta}>
        <Badge label="Tipo" value={campo.tipo} />
        <Badge label="Critério" value={campo.criterio} />
        <Badge label="Confiabilidade" value={campo.confiabilidade.toString()} />
        <Badge label="LGPD" value={campo.lgpdStatus} />
        <Badge label="Link" value={`${campo.linkConfidence}%`} />
      </div>
      <div className={cls.keyValueList}>
        <KeyValue label="Questão de negócio" value={campo.questaoNegocio} />
        <KeyValue label="Exemplo de tratamento" value={campo.exemploTratamento} />
        <KeyValue label="Coletado em" value={dataColeta} />
        <KeyValue label="Fonte" value={campo.dado.fonte?.nome ?? 'Não informada pela API'} />
      </div>
      {campo.dado.fonte?.url ? (
        <a className={cls.linkButton} href={campo.dado.fonte.url} target="_blank" rel="noreferrer">
          Abrir fonte
        </a>
      ) : null}
    </div>
  );
}
