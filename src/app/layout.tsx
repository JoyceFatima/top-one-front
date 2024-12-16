import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Layout, ProvidersLoader } from '@/components';
import { AuthProvider, SidebarProvider, ThemeProvider } from '@/contexts';
import { ToastProvider } from '@/components/ui/toast';
import { NextIntlClientProvider } from 'next-intl';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Top one',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html
      lang="en"
      className="bg-white dark:bg-gray-900 text-black dark:text-white"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <NextIntlClientProvider locale={params.locale}>
          <ProvidersLoader
            providers={[
              AuthProvider,
              ToastProvider,
              ThemeProvider,
              SidebarProvider,
            ]}
          >
            <Layout>{children}</Layout>
          </ProvidersLoader>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
