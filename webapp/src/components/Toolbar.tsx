import { ReactNode } from 'react';

interface ToolbarProps {
  actions: Array<{
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    disabled?: boolean;
  }>;
}

const Toolbar = ({ actions }: ToolbarProps) => (
  <div
    role="toolbar"
    aria-label="Ações do relatório"
    style={{
      display: 'flex',
      gap: 'var(--spacing-md)',
      flexWrap: 'wrap',
      marginBottom: 'var(--spacing-xl)'
    }}
  >
    {actions.map((action) => (
      <button
        key={action.label}
        type="button"
        onClick={action.onClick}
        disabled={action.disabled}
        style={{
          padding: 'var(--spacing-sm) var(--spacing-lg)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)',
          background: action.disabled ? 'rgba(120, 120, 128, 0.08)' : 'var(--color-surface)',
          color: action.disabled ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
          fontWeight: 600,
          cursor: action.disabled ? 'not-allowed' : 'pointer',
          transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          {action.icon}
          {action.label}
        </span>
      </button>
    ))}
  </div>
);

export default Toolbar;
