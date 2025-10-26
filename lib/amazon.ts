export function withAmazonTag(url: string, tag: string): string {
  try {
    const u = new URL(url);
    if (!u.searchParams.get('tag') && tag) {
      u.searchParams.set('tag', tag);
    }
    return u.toString();
  } catch {
    return url;
  }
}
