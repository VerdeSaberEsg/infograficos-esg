import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatusChipProps {
  status: 'ok' | 'irregular' | 'desconhecido';
  label: string;
  icon: ReactNode;
}

const StatusChip = ({ status, label, icon }: StatusChipProps) => (
  <motion.span
    className="status-chip"
    data-state={status}
    role="status"
    aria-live="polite"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
  >
    <span className="chip-icon" aria-hidden="true">
      {icon}
    </span>
    {label}
  </motion.span>
);

export default StatusChip;
