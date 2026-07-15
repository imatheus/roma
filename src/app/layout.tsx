import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portal de Compras - Definição de Regras',
  description: 'Dúvidas de Produto e Regras de Negócio da Parte 1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
