import { PropsWithChildren } from 'react';
import styles from './card.module.css';

export default function Card({ children }: PropsWithChildren) {
  return <section className={styles.card}>{children}</section>;
}
