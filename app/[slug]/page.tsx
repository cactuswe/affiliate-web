import { getAllProducts, getProductBySlug } from '../../lib/products';
import { withAmazonTag } from '../../lib/amazon';

// Important for static export: only build the slugs we list here
export const dynamicParams = false;

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const prod = getProductBySlug(params.slug);
  if (!prod) {
    return <div>Product not found.</div>;
  }

  const tag = process.env.AMAZON_TAG || '';
  const url = withAmazonTag(prod.affiliateUrl, tag);

  return (
    <article>
      <h1>{prod.title}</h1>
      <div
        style={{
          border: '1px solid #eee',
          borderRadius: 8,
          overflow: 'hidden',
          marginBottom: 16,
        }}
      >
        <img
          src={prod.image || '/placeholder.jpg'}
          alt={prod.title}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <p style={{ lineHeight: 1.6 }}>{prod.description}</p>
      <a
        href={url}
        rel="nofollow noopener"
        target="_blank"
        style={{
          display: 'inline-block',
          marginTop: 16,
          padding: '12px 16px',
          borderRadius: 6,
          border: '1px solid #111',
          textDecoration: 'none',
          fontWeight: 700,
        }}
      >
        View on Amazon →
      </a>
      <p style={{ fontSize: 12, color: '#666', marginTop: 12 }}>
        As an Amazon Associate I earn from qualifying purchases.
      </p>
    </article>
  );
}
