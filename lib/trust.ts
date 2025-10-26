export function softTrustLine(title: string, category?: string) {
  const t = (title || '').toLowerCase();
  const c = (category || '').toLowerCase();
  const vibe = [
    `I fell for this after searching for ${c || 'something simple'} — it feels reliable and easy to use.`,
    `I picked this because it works daily without fuss — it feels thoughtfully made.`,
    `This stood out for its balance between comfort and style — I recommend it warmly.`,
    `I like how it ${c || 'fits into everyday life'} — subtle but genuinely useful.`,
    `I saved this to my own list first — great value and it holds up.`
  ];
  const pick = (t.includes('sneak') || t.includes('shoe')) ? 0 :
               (t.includes('jack') || t.includes('coat')) ? 2 :
               Math.floor(Math.random() * vibe.length);
  return vibe[pick];
}
