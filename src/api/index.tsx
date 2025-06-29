import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { amount, currency, customerEmail } = req.body;

  try { 
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in the smallest currency unit (e.g. cents)
      currency,
      receipt_email: customerEmail,
      payment_method_types: ['card', 'apple_pay', 'google_pay'], // 'card' covers Apple/Google Pay via Stripe.js
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}