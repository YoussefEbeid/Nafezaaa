import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Assumed you have Tailwind directives here
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nafeza - National Single Window for Foreign Trade',
  description: 'The unified platform for Egyptian Trade Declarations and ACI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        {/* Wrap everything in QueryProvider so we can fetch data anywhere */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}