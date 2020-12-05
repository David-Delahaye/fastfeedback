import { getSite } from '@/lib/db-admin';

export default async function handler(req, res) {
  console.log(siteId);
  const siteId = req.query.siteId;
  const { site } = await getSite(siteId);
  if (error) {
    res.status(500).json({ error });
  }

  console.log(site);
  res.status(200).json({ site });
}
