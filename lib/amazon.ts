// lib/amazon.ts
const ASIN_RE = /(?:dp|gp\/product)\/([A-Z0-9]{10})/i;

export function withAmazonTag(rawUrl: string, tag: string): string {
  try {
    const u = new URL(rawUrl);

    // Försök extrahera ASIN
    let asin = '';
    const m = u.pathname.match(ASIN_RE);
    if (m && m[1]) asin = m[1].toUpperCase();
    else {
      // fallback: leta i hela strängen
      const m2 = rawUrl.match(/[A-Z0-9]{10}/i);
      if (m2) asin = m2[0].toUpperCase();
    }
    if (!asin) return rawUrl; // om vi inte hittar ASIN, lämna originalet

    // Bygg ren canonical-path
    const base = `${u.protocol}//${u.host}/dp/${asin}`;
    const clean = new URL(base);

    // Behåll bara whitelistade parametrar
    const keep = new Set(['tag', 'language', 'th', 'psc']);
    // ta med befintlig tag om finns, annars set nedan
    for (const [k, v] of u.searchParams.entries()) {
      if (keep.has(k)) clean.searchParams.set(k, v);
    }
    if (tag && !clean.searchParams.get('tag')) {
      clean.searchParams.set('tag', tag);
    }
    return clean.toString();
  } catch {
    return rawUrl;
  }
}
