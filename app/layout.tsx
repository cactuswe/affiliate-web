export const metadata = { title: 'Affiliate Web' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
