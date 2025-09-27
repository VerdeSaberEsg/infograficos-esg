import Card from './Card';
import FieldRow from './FieldRow';
import cls from './ui.module.css';
import type { CampoComMetadado } from '../../../packages/shared/types.js';

interface SectionProps {
  titulo: string;
  campos: CampoComMetadado[];
}

export default function Section({ titulo, campos }: SectionProps) {
  if (campos.length === 0) return null;
  return (
    <Card>
      <div className={cls.section}>
        <h2 className={cls.sectionTitle}>{titulo}</h2>
        <div role="list" aria-label={`Seção ${titulo}`}>
          {campos.map((campo) => (
            <FieldRow key={campo.codigo} campo={campo} />
          ))}
        </div>
      </div>
    </Card>
  );
}
