import './globals.css';

export const metadata = {
  title: 'Affiliate Web',
  description: 'Fast bridge site for affiliate products'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <header style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
          <a href="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 700 }}>
            Affiliate Web
          </a>
          <a href="/admin" style={{ float: 'right', textDecoration: 'none' }}>Admin</a>
        </header>
        <main style={{ maxWidth: 900, margin: '0 auto', padding: '24px' }}>
          {children}
        </main>
        <footer style={{ padding: '24px', borderTop: '1px solid #eee', fontSize: 12, color: '#555' }}>
          As an Amazon Associate I earn from qualifying purchases.
        </footer>
      </body>
    </html>
  );
}
