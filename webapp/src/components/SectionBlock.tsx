import { ReactNode } from 'react';

interface SectionBlockProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const SectionBlock = ({ title, description, children }: SectionBlockProps) => (
  <section className="card" style={{ marginBottom: 'var(--spacing-xxl)' }}>
    <header>
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-family-display)',
          fontSize: '1.5rem',
          letterSpacing: '-0.01em'
        }}
      >
        {title}
      </h2>
      {description && (
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)' }}>{description}</p>
      )}
    </header>
    <div style={{ marginTop: 'var(--spacing-lg)' }}>{children}</div>
  </section>
);

export default SectionBlock;
