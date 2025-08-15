import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const body = `User-agent: *
Allow: /

Sitemap: https://www.franklinwineloft.com/sitemap.xml
`;
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(body);
}
