import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Anon Launcher - Privacy Based Token Launch Primitive',
  description: 'Anon Launcher helps you launch tokens anonymously without paying exorbitant fees or compromising speed',
  openGraph: {
    title: 'Anon Launcher - Privacy Based Token Launch Primitive',
    description: 'Anon Launcher helps you launch tokens anonymously without paying exorbitant fees or compromising speed',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anon Launcher - Privacy Based Token Launch Primitive',
    description: 'Anon Launcher helps you launch tokens anonymously without paying exorbitant fees or compromising speed',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}


