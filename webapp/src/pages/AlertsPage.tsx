import { useMemo } from 'react';
import { useLookup } from '../services/LookupContext';
import StatusChip from '../components/StatusChip';
import SectionBlock from '../components/SectionBlock';
import { FieldResult } from '../services/types';
import { formatDateTime } from '../utils/formatters';

const ALERT_KEYS = {
  cndt: ['cndt_situacao', 'cndt_data_emissao'],
  cndFederal: ['cnd_federal_situacao', 'cnd_federal_validade'],
  crf: ['crf_situacao', 'crf_validade'],
  pgfn: ['pgfn_inscricoes_quantidade', 'pgfn_valor_total'],
  ibama: ['ibama_autos_infracao', 'ibama_valor_multas'],
  icmbio: ['icmbio_embargo_ocorrencia'],
  trabalho: ['mte_resgates_trabalho_escravo', 'mte_autos_infracao']
} as const;

type AlertGroupKey = keyof typeof ALERT_KEYS;

type AlertEntry = {
  key: AlertGroupKey;
  title: string;
  description: string;
  fields: FieldResult[];
};

const deriveStatus = (fields: FieldResult[]): 'ok' | 'irregular' | 'desconhecido' => {
  if (fields.every((field) => !field.data)) {
    return 'desconhecido';
  }
  const hasIssue = fields.some((field) => {
    if (!field.data) {
      return false;
    }
    const numericValue = Number(field.data.value.replace(/[^0-9.-]/g, ''));
    if (!Number.isNaN(numericValue) && numericValue > 0) {
      return true;
    }
    const normalized = field.data.value.toLowerCase();
    return ['irregular', 'positivo', 'embargo', 'inadimpl', 'suspenso', 'bloqueado'].some((token) =>
      normalized.includes(token)
    );
  });
  return hasIssue ? 'irregular' : 'ok';
};

const AlertsPage = () => {
  const { response } = useLookup();

  const alerts: AlertEntry[] = useMemo(() => {
    if (!response) {
      return [];
    }
    const group = (key: AlertGroupKey, title: string, description: string): AlertEntry => {
      const fieldKeys = ALERT_KEYS[key];
      const fields = response.fields.filter((field) => fieldKeys.includes(field.key));
      return { key, title, description, fields };
    };
    return [
      group('cndt', 'CNDT - Justiça do Trabalho', 'Certidão Negativa de Débitos Trabalhistas.'),
      group('cndFederal', 'CND Federal', 'Situação fiscal na Receita Federal do Brasil.'),
      group('crf', 'CRF/FGTS', 'Regularidade do Fundo de Garantia do Tempo de Serviço.'),
      group('pgfn', 'PGFN / Dívida Ativa', 'Inscrições e valores junto à Procuradoria-Geral da Fazenda Nacional.'),
      group('ibama', 'IBAMA', 'Autos de infração e multas ambientais.'),
      group('icmbio', 'ICMBio', 'Embargos ou ocorrências em áreas protegidas.'),
      group('trabalho', 'Fiscalização Trabalhista', 'Autos e resgates do Ministério do Trabalho e Emprego.')
    ];
  }, [response]);

  if (!response) {
    return (
      <SectionBlock title="Nenhum resultado" description="Realize uma consulta para visualizar alertas." />
    );
  }

  return (
    <SectionBlock
      title="Alertas e bloqueios"
      description="Resumo dos principais certificados de regularidade e ocorrências negativas."
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
        {alerts.map((alert) => {
          const status = deriveStatus(alert.fields);
          const statusLabel =
            status === 'ok' ? 'OK' : status === 'irregular' ? 'Irregular' : 'Desconhecido';
          return (
            <article
              key={alert.key}
              className="card"
              style={{ padding: 'var(--spacing-lg)', boxShadow: 'none', border: '1px solid var(--color-border)' }}
            >
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{alert.title}</h3>
                  <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-text-secondary)' }}>
                    {alert.description}
                  </p>
                </div>
                <StatusChip
                  status={status}
                  label={statusLabel}
                  icon={<span aria-hidden="true">{status === 'ok' ? '●' : status === 'irregular' ? '▲' : '■'}</span>}
                />
              </header>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 'var(--spacing-lg) 0 0 0',
                  padding: 0,
                  display: 'grid',
                  gap: 'var(--spacing-sm)'
                }}
              >
                {alert.fields.map((field) => (
                  <li key={field.key}>
                    <span style={{ fontWeight: 600 }}>{field.label}</span>
                    {field.data ? (
                      <span style={{ marginLeft: 'var(--spacing-sm)' }}>{field.data.value}</span>
                    ) : (
                      <span style={{ marginLeft: 'var(--spacing-sm)', color: 'var(--color-text-secondary)' }}>
                        {field.failure?.reason ?? 'indisponível'}
                      </span>
                    )}
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                      {field.data ? `Fonte: ${field.data.source_name} · ${formatDateTime(field.data.fetched_at)}` : ''}
                    </div>
                    <a
                      href={field.data?.source_url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!field.data}
                      style={{
                        pointerEvents: field.data ? 'auto' : 'none',
                        opacity: field.data ? 1 : 0.5,
                        color: 'var(--color-primary)',
                        fontWeight: 600
                      }}
                    >
                      Ver fonte
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </SectionBlock>
  );
};

export default AlertsPage;
