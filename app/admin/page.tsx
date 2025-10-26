'use client';
import { useState } from 'react';
import AdminLogin from './login';

export default function AdminPage() {
  const [authOk, setAuthOk] = useState(false);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  if (!authOk) return <AdminLogin onOk={()=>setAuthOk(true)} />;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Skickar...');
    const res = await fetch('/api/create-product', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'X-Admin-Auth': password },
      body: JSON.stringify({ title, image, affiliateUrl, description })
    });
    if (res.ok) {
      const data = await res.json();
      setStatus(`Klart: /${data.slug}`);
      setTitle(''); setImage(''); setAffiliateUrl(''); setDescription('');
    } else {
      setStatus(`Fel: ${res.status} ${await res.text()}`);
    }
  }

  return (
    <div style={{ maxWidth: 680, margin:'32px auto', padding:'0 16px' }}>
      <h1>Skapa ny produkt</h1>
      <form onSubmit={submit} style={{ display:'grid', gap:12 }}>
        <label>Lösenord
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required
                 style={{ width:'100%', padding:10, border:'1px solid #ccc', borderRadius:6 }} />
        </label>
        <label>Titel
          <input value={title} onChange={e=>setTitle(e.target.value)} required
                 style={{ width:'100%', padding:10, border:'1px solid #ccc', borderRadius:6 }} />
        </label>
        <label>Bild-URL
          <input value={image} onChange={e=>setImage(e.target.value)} required placeholder="https://..."
                 style={{ width:'100%', padding:10, border:'1px solid #ccc', borderRadius:6 }} />
        </label>
        <label>Amazon-länk
          <input value={affiliateUrl} onChange={e=>setAffiliateUrl(e.target.value)} required
                 style={{ width:'100%', padding:10, border:'1px solid #ccc', borderRadius:6 }} />
        </label>
        <label>Beskrivning
          <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={6}
                    style={{ width:'100%', padding:10, border:'1px solid #ccc', borderRadius:6 }} />
        </label>
        <button type="submit" style={{ padding:'12px 16px', borderRadius:6 }}>Skapa</button>
      </form>
      {status && <p style={{ marginTop:12 }}>{status}</p>}
    </div>
  );
}
