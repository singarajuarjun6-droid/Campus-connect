import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SpaceBackground from '@/components/SpaceBackground';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'CampusConnect',
  description: 'Anonymous student discovery platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <SpaceBackground />
        {children}
      </body>
    </html>
  );
}
