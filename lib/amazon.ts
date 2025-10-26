const ASIN_RE = /(?:dp|gp\/product)\/([A-Z0-9]{10})/i;

export function canonicalAmazonUrl(rawUrl: string, tag: string) {
  try {
    const u = new URL(rawUrl);
    const m = u.pathname.match(ASIN_RE);
    const asin = (m && m[1]) ? m[1].toUpperCase() : '';
    if (!asin) return rawUrl;
    const clean = new URL(`${u.protocol}//${u.host}/dp/${asin}`);
    const keep = new Set(['tag', 'th', 'psc', 'language']);
    for (const [k, v] of u.searchParams.entries()) if (keep.has(k)) clean.searchParams.set(k, v);
    if (tag && !clean.searchParams.get('tag')) clean.searchParams.set('tag', tag);
    return clean.toString();
  } catch {
    return rawUrl;
  }
}
