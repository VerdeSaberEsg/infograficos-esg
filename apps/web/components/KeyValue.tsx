import cls from './ui.module.css';

interface KeyValueProps {
  label: string;
  value: string;
}

export default function KeyValue({ label, value }: KeyValueProps) {
  return (
    <dl className={cls.keyValue}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
}
