import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Sistema ESG Empresarial Brasileiro',
  description: 'Consulta ESG governamental sem dados fictícios'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
