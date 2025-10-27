import { getProductBySlug } from '../../../lib/products';
import { canonicalAmazonUrl } from '../../../lib/amazon';
import { softTrustLine } from '../../../lib/trust';
import { notFound } from 'next/navigation';
import ImageWithPlaceholder from '../../../components/ui/ImageWithPlaceholder';

const styles = {
  page: { background: '#FAF8F6', minHeight: '100vh', padding: 24 },
  container: { maxWidth: 560, margin: '0 auto' },
  card: { background: '#fff', borderRadius: 20, boxShadow: '0 6px 20px rgba(0,0,0,0.06)', padding: 16 },
  imgWrap: { position: 'relative' as const, width: '100%', maxHeight: '60vh', overflow: 'hidden', borderRadius: 16, background: 'linear-gradient(180deg,#fff,#f7f5f3)' , display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.04)' },
  img: { width: '100%', height: 'auto', maxHeight: '56vh', objectFit: 'contain' as const, display: 'block', background: 'transparent' },
  h1: { fontSize: 28, margin: '16px 4px 8px', lineHeight: 1.2 },
  desc: { color: '#444', fontSize: 16, lineHeight: 1.6, margin: '0 4px 12px' },
  price: { color: '#777', fontSize: 14, margin: '0 4px 12px' },
  cta: { display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 20px', borderRadius: 14,
       background: '#ff6b35', color: '#fff', textDecoration: 'none', fontWeight: 800,
       boxShadow: '0 8px 28px rgba(255,107,53,0.18)', fontSize: 16 },
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
              <ImageWithPlaceholder src={p.image || '/placeholder.jpg'} alt={p.title} lqip={(p as any).lqip} />
            </div>
          <h1 style={styles.h1}>{p.title}</h1>
          {p.description && <p style={styles.desc}>{p.description}</p>}
          {(p as any).priceHint && <p style={styles.price}>Price: {(p as any).priceHint} • {((p as any).freeShipping) ? 'Free shipping' : 'Shipping may apply'}</p>}
            <a href={url} rel="nofollow noopener noreferrer" target="_blank" style={styles.cta} aria-label={`Open ${p.title} on Amazon`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{display:'block'}}>
                <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
              </svg>
              Buy on Amazon
            </a>
            <div style={styles.note}>
              <strong style={{ background: '#eef6ff', padding: '4px 8px', borderRadius: 999, fontSize: 12, display: 'inline-block' }}>We test this</strong>
              <div style={{ marginTop: 8, fontSize: 13, color: '#555' }}>Curated by Noah's Finds</div>
            </div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 8 }}>{trust}</div>
          <div style={styles.trust}>{trust}</div>
        </article>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
