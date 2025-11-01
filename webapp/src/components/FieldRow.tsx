import { motion } from 'framer-motion';
import { FieldResult } from '../services/types';
import { formatDateTime } from '../utils/formatters';

interface FieldRowProps {
  field: FieldResult;
}

const FieldRow = ({ field }: FieldRowProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 'var(--spacing-md)',
      padding: 'var(--spacing-md) 0',
      borderBottom: '1px solid var(--color-border)'
    }}
  >
    <div>
      <div style={{ fontWeight: 600 }}>{field.label}</div>
      {field.data ? (
        <div style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-text-secondary)' }}>
          <div>{field.data.value}</div>
          <div style={{ fontSize: '0.75rem', marginTop: 'var(--spacing-xxs)' }}>
            Coletado: {formatDateTime(field.data.fetched_at)} · HTTP {field.data.http_status}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 'var(--spacing-xs)', color: 'var(--color-text-secondary)' }}>
          <div>{field.failure?.reason ?? 'indisponível'}</div>
          {field.failure?.error && (
            <div style={{ fontSize: '0.75rem', marginTop: 'var(--spacing-xxs)' }}>{field.failure.error}</div>
          )}
          {field.failure?.http_status && (
            <div style={{ fontSize: '0.75rem', marginTop: 'var(--spacing-xxs)' }}>
              HTTP {field.failure.http_status}
            </div>
          )}
        </div>
      )}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
      <a
        href={field.data?.source_url ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!field.data}
        style={{
          pointerEvents: field.data ? 'auto' : 'none',
          opacity: field.data ? 1 : 0.5,
          fontWeight: 600,
          color: 'var(--color-primary)'
        }}
      >
        Ver fonte
      </a>
    </div>
  </motion.div>
);

export default FieldRow;
