import type { Metadata } from 'next';
import { Locale } from '../../lib/dictionary';
import "./globals.css";

export const metadata: Metadata = {
  title: 'Next.js i18n App',
  description: 'Internacionalización en Next.js',
};

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className="p-8 font-sans bg-gray-50 text-gray-900">
        <header className="mb-8 flex gap-4 border-b pb-4">
          <a href="/es" className="hover:underline text-blue-600">Español</a>
          <a href="/en" className="hover:underline text-blue-600">English</a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}