import type { NextApiRequest, NextApiResponse } from 'next';

// Simple, small whitelist proxy for remote images (only Amazon hosts).
// Usage: /api/proxy-image?url=<encoded-url>
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url || Array.isArray(url)) return res.status(400).send('missing url');

  let decoded = '';
  try {
    decoded = decodeURIComponent(url as string);
  } catch (e) {
    decoded = String(url);
  }

  let parsed: URL;
  try {
    parsed = new URL(decoded);
  } catch (err) {
    return res.status(400).send('invalid url');
  }

  const allowedHosts = [
    'm.media-amazon.com',
    'images-na.ssl-images-amazon.com',
    'images-eu.ssl-images-amazon.com',
    'images.amazon.com',
  ];

  if (!allowedHosts.includes(parsed.hostname)) {
    return res.status(403).send('forbidden');
  }

  try {
    // Fetch the remote image server-side. Provide a common browser UA so some CDNs respond.
    const r = await fetch(decoded, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ImageProxy/1.0)' } });
    if (!r.ok) return res.status(r.status).end();

    const contentType = r.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await r.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    // cache for a day on CDN / browser
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    return res.status(200).send(buffer);
  } catch (err) {
    return res.status(502).send('bad gateway');
  }
}
