import cls from './ui.module.css';

interface BadgeProps {
  label: string;
  value: string;
}

export default function Badge({ label, value }: BadgeProps) {
  return (
    <span className={cls.badge}>
      <strong>{label}</strong>
      {value}
    </span>
  );
}
