import type { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = 'https://www.franklinwineloft.com';

const paths = [
  '/',
  '/events'
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const urls = paths.map((p) => `<url><loc>${SITE_URL}${p}</loc><changefreq>weekly</changefreq><priority>${p === '/' ? '1.0' : '0.7'}</priority></url>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
