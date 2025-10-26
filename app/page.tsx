import Link from 'next/link';
import { getAllProducts } from '../lib/products';

export default function Home() {
  const products = getAllProducts();

  return (
    <div>
      <h1>Senaste produkter</h1>
      {products.length === 0 && <p>Inga produkter ännu.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {products.map(p => (
          <Link key={p.slug} href={`/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
              <img src={p.image || '/placeholder.jpg'} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 700 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{new Date(p.createdAt).toLocaleDateString('sv-SE')}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
