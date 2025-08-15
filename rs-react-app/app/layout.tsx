import type { Metadata } from 'next';
import Header from '@components/header';
import ReduxProvider from '@redux/redux-provider';
import ThemeProvider from '@theme/theme-provider';
import '../styles/App.css';
import '../styles/index.css';

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'Next.js App is a task of REACT2025Q3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <ThemeProvider>
            <ReduxProvider>
              <Header />
              {children}
            </ReduxProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
