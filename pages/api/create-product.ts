import type { NextApiRequest, NextApiResponse } from 'next';
import { toSlug } from '../../lib/slug';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const TOKEN = process.env.GITHUB_TOKEN!;
const AMAZON_TAG = process.env.AMAZON_TAG || '';

type Body = {
  _ping?: boolean;
  title?: string;
  image?: string;
  affiliateUrl?: string;
  description?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.headers['x-admin-auth'];
  if (!auth || auth !== ADMIN_PASSWORD) return res.status(401).send('Unauthorized');

  const body = req.body as Body;
  if (body?._ping) return res.status(204).end();

  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { title, image, affiliateUrl, description } = body || {};
  if (!title || !image || !affiliateUrl) return res.status(400).send('Missing fields');

  const slug = toSlug(title);
  const now = new Date().toISOString();

  let url = affiliateUrl;
  try {
    const u = new URL(affiliateUrl);
    if (!u.searchParams.get('tag') && AMAZON_TAG) {
      u.searchParams.set('tag', AMAZON_TAG);
      url = u.toString();
    }
  } catch {
  }

  const contentObj = {
    slug,
    title,
    image,
    description: description || '',
    affiliateUrl: url,
    createdAt: now
  };

  const newPath = `data/products/${slug}.json`;
  const content = Buffer.from(JSON.stringify(contentObj, null, 2), 'utf8').toString('base64');

  const headResp = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    headers: { Authorization: `token ${TOKEN}`, 'Content-Type': 'application/json' }
  });
  if (!headResp.ok) {
    const t = await headResp.text();
    return res.status(500).send(`Failed to get HEAD: ${t}`);
  }
  const headData: any = await headResp.json();
  const latestCommitSha = headData.object.sha;

  const commitResp = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/commits/${latestCommitSha}`, {
    headers: { Authorization: `token ${TOKEN}` }
  });
  const commitData: any = await commitResp.json();
  const baseTreeSha = commitData.tree.sha;

  const blobResp = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/blobs`, {
    method: 'POST',
    headers: { Authorization: `token ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: Buffer.from(JSON.stringify(contentObj, null, 2)).toString('base64'), encoding: 'base64' })
  });
  const blobData: any = await blobResp.json();

  const treeResp = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/trees`, {
    method: 'POST',
    headers: { Authorization: `token ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: [{
        path: newPath,
        mode: '100644',
        type: 'blob',
        sha: blobData.sha
      }]
    })
  });
  if (!treeResp.ok) {
    const t = await treeResp.text();
    return res.status(500).send(`Failed to create tree: ${t}`);
  }
  const treeData: any = await treeResp.json();

  const newCommitResp = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/commits`, {
    method: 'POST',
    headers: { Authorization: `token ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Add product ${slug}`,
      tree: treeData.sha,
      parents: [latestCommitSha]
    })
  });
  const newCommitData: any = await newCommitResp.json();

  const updateRefResp = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    headers: { Authorization: `token ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sha: newCommitData.sha, force: false })
  });
  if (!updateRefResp.ok) {
    const t = await updateRefResp.text();
    return res.status(500).send(`Failed to update ref: ${t}`);
  }

  return res.status(200).json({ slug, path: `/${slug}` });
}
