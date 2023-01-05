import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51LN5G7HWg8t6HnQGXstnBTiglHtq5oPuccTJw9Oc3Lakj8UGdrLs5pI4ysqEP2P5vSoN1Eiefy6Lg5mIJvNT9a7M00drB9MeR6'
  );
  try {
    // 1. Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
