import {Roboto} from 'next/font/google';
import {ThemeProvider} from '@mui/material/styles';
import theme from 'app/theme';
import './globals.css';

let title = 'Next.js + Postgres Auth Starter';
let description =
  'This is a Next.js starter kit that uses NextAuth.js for simple email + password login and a Postgres database to persist the data.';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
  subsets: ['cyrillic', 'latin', 'cyrillic-ext', 'latin-ext']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
