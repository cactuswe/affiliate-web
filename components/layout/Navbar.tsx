import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full border-b py-4 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-bold">Affiliate Web</Link>
        <div>
          <Link href="/admin" className="ml-4">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
