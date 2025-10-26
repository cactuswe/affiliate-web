import Link from 'next/link';
import { getAllProducts } from '../lib/products';
import Card from '../components/ui/Card';

export default function Home() {
  const products = getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Latest products</h1>
        <div></div>
      </div>

      {products.length === 0 && <p className="text-muted">No products yet.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link key={p.slug} href={`/${p.slug}`} className="no-underline text-inherit">
            <Card>
              <div className="aspect-square bg-gray-100 dark:bg-slate-800">
                <img src={p.image || '/placeholder.jpg'} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs text-slate-500 mt-2">{new Date(p.createdAt).toLocaleDateString('en-GB')}</div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
