import './globals.css';
import { ToastProvider } from '../components/ui/Toast';

export const metadata = {
  title: 'Affiliate Web',
  description: 'Fast bridge site for affiliate products'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center">
        <ToastProvider>
          <main className="w-full max-w-md mx-auto p-6">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
