import fs from 'fs';
import path from 'path';

export type Product = {
  slug: string;
  title: string;
  image: string;
  description: string;
  affiliateUrl: string;
  createdAt: string;
};

export function getProductsDir() {
  return path.join(process.cwd(), 'data', 'products');
}

export function getAllProducts(): Product[] {
  const dir = getProductsDir();
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const items: Product[] = files.map(f => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    return JSON.parse(raw);
  });
  return items.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export function getProductBySlug(slug: string): Product | null {
  const file = path.join(getProductsDir(), `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}
