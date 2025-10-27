export function softTrustLine(title: string, category?: string) {
  const t = (title || '').toLowerCase();
  const c = (category || '').toLowerCase();
  const lines = [
    `I tried this myself and kept it — works exactly as described and made my life a bit easier.`,
    `Bought this after reading a few reviews; it arrived quickly and feels well-made. Happy with it.`,
    `This is my go-to when I want reliability without fuss. Easy to recommend to friends.`,
    `Practical, solid, and pleasantly simple — I use it often and it still performs.`,
    `I added this to my own shortlist; it gives good value and hasn't disappointed.`
  ];
  const pick = (t.includes('sneak') || t.includes('shoe')) ? 0 :
               (t.includes('jacket') || t.includes('coat')) ? 2 :
               Math.floor(Math.random() * lines.length);
  return lines[pick];
}
