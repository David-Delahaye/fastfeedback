import firebase from './firebase';
import getStripe from './stripe';

const firestore = firebase.firestore();
const app = firebase.app();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  const site = firestore.collection('sites').doc();
  site.set(data);
  return site;
}

export function createFeedback(data) {
  return firestore.collection('feedback').add(data);
}

export function deleteFeedback(feedbackId) {
  return firestore.collection('feedback').doc(feedbackId).delete();
}

export async function createCheckoutSession(uid) {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1HtcvOKHuWJkTRiabVdsp41f',
      success_url: `${window.location.origin}/account`,
      cancel_url: `${window.location.origin}/account`
    });
  // Wait for the CheckoutSession to get attached by the extension
  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}

export async function createBillingPortal(uid) {
  const functionRef = app
    .functions('europe-west2')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/account`
  });
  window.location.assign(data.url);
}
