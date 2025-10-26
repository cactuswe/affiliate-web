import './globals.css';
import Navbar from '../components/layout/Navbar';
import { ToastProvider } from '../components/ui/Toast';

export const metadata = {
  title: 'Affiliate Web',
  description: 'Fast bridge site for affiliate products'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <Navbar />
          <main className="flex-1 max-w-4xl w-full mx-auto p-6">{children}</main>
          <footer className="border-t text-sm text-slate-600 py-6">
            <div className="max-w-4xl mx-auto px-4">As an Amazon Associate I earn from qualifying purchases.</div>
          </footer>
        </ToastProvider>
      </body>
    </html>
  );
}
