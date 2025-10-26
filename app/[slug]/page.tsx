import { getProductBySlug } from '../../lib/products';
import { canonicalAmazonUrl } from '../../lib/amazon';
import { softTrustLine } from '../../lib/trust';
import { notFound } from 'next/navigation';

const styles = {
  page: { background: '#FAF8F6', minHeight: '100vh', padding: 24 },
  container: { maxWidth: 560, margin: '0 auto' },
  card: { background: '#fff', borderRadius: 20, boxShadow: '0 6px 20px rgba(0,0,0,0.06)', padding: 16 },
  imgWrap: { position: 'relative' as const, width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: 16, background: '#f2f2f2' },
  img: { width: '100%', height: '100%', objectFit: 'cover' as const, display: 'block' },
  h1: { fontSize: 28, margin: '16px 4px 8px', lineHeight: 1.2 },
  desc: { color: '#444', fontSize: 16, lineHeight: 1.6, margin: '0 4px 12px' },
  price: { color: '#777', fontSize: 14, margin: '0 4px 12px' },
  cta: { display: 'inline-block', padding: '14px 18px', borderRadius: 12,
       background: '#FF9C55', color: '#fff', textDecoration: 'none', fontWeight: 700,
       boxShadow: '0 4px 14px rgba(255,156,85,0.35)' },
  note: { color: '#777', fontSize: 12, marginTop: 8 },
  trust: { color: '#666', fontSize: 14, fontStyle: 'italic' as const, marginTop: 12 }
} as const;

export async function generateStaticParams() {
  // Optional: silently rely on products in data/products
  return [];
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) return notFound();
  const tag = process.env.AMAZON_TAG || '';
  const url = canonicalAmazonUrl(p.affiliateUrl, tag);
  const trust = softTrustLine(p.title, (p as any).category);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    image: [p.image],
    description: p.description,
    offers: { '@type': 'Offer', url: url, priceCurrency: 'SEK', availability: 'https://schema.org/InStock' }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <article style={styles.card}>
          <div style={styles.imgWrap}>
            <img src={p.image || '/placeholder.jpg'} alt={p.title} style={styles.img} />
          </div>
          <h1 style={styles.h1}>{p.title}</h1>
          {p.description && <p style={styles.desc}>{p.description}</p>}
          {(p as any).priceHint && <p style={styles.price}>Cirka pris på Amazon: {(p as any).priceHint}</p>}
          <a href={url} rel="nofollow noopener" target="_blank" style={styles.cta}>Visa på Amazon →</a>
          <div style={styles.note}>Amazon affiliate-länk – kuraterad rekommendation</div>
          <div style={styles.trust}>{trust}</div>
        </article>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
