import { getAllFeedback, getSite } from '@/lib/db-admin';

export default async function handler(req, res) {
  try {
    const [siteId, route] = req.query.site;
    const status = req.headers.token || false
    const { feedback } = await getAllFeedback(siteId, route, status);

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error });
  }
}
