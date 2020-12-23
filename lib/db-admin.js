import { compareDesc, parseISO } from 'date-fns';
import { db } from './firebase-admin';

export async function getAllFeedback(siteId, route) {
  try {
    let ref = db
      .collection('feedback')
      .where('siteId', '==', siteId)
      .where('status', '==', 'active');

    if (route) {
      ref = ref.where('route', '==', route);
    }

    const snapshot = await ref.get();
    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getSite(id) {
  try {
    const doc = await db.collection('sites').doc(id).get();
    let site = { id: doc.id, ...doc.data() };

    return { site };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  try {
    const snapshot = await db.collection('sites').get();
    let sites = [];

    await snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(userId) {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', userId)
    .get();
  let sites = [];

  await snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function getAllSiteFeedback(userId) {
  let snapshot = await db
    .collection('sites')
    .where('authorId', '==', userId)
    .get();
  let siteIds = [];

  await snapshot.forEach((doc) => {
    siteIds.push(doc.id);
  });

  let snapshot2 = await db
    .collection('feedback')
    .where('siteId', 'in', siteIds)
    .where('status', '!=', 'removed')
    .get();

  let feedback = [];
  await snapshot2.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}

export async function getUserFeedback(userId) {
  const snapshot = await db
    .collection('feedback')
    .where('authorId', '==', userId)
    .where('status', 'in', ['pending', 'active'])
    .get();
  let feedback = [];

  await snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}

export async function getUser(userId) {
  const userDetails = await db
    .collection('users').doc(userId).get();
  return { userDetails };
}
