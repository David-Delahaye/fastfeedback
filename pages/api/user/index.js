import { getUser } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';

export default async function handler(req, res) {
    try {
        const { uid } = await auth.verifyIdToken(req.headers.token);
        const { userDetails } = await getUser(uid);
        res.status(200).json({ userDetails });
    } catch (error) {
      res.status(500).json({ error });
    }
  }