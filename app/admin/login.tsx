
'use client';
import { useState } from 'react';

export default function AdminLogin({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    const res = await fetch('/api/create-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Auth': pw },
      body: JSON.stringify({ _ping: true })
    });
    if (res.status === 204) onOk();
    else setErr('Fel lösenord.');
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, margin: '48px auto', display: 'grid', gap: 12 }}>
      <h2>Admin login</h2>
      <input type="password" placeholder="Lösenord" value={pw} onChange={e=>setPw(e.target.value)}
              style={{ width:'100%', padding:10, border:'1px solid #ccc', borderRadius:6 }} />
      <button type="submit" style={{ padding:'10px 14px', borderRadius:6 }}>Logga in</button>
      {err && <div style={{ color:'crimson' }}>{err}</div>}
    </form>
  );
}
