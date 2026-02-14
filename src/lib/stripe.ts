import Stripe from "stripe";

// Initialize Stripe with the secret key
// Falls back gracefully for demo mode when no key is configured
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

let stripe: Stripe | null = null;

if (stripeSecretKey && stripeSecretKey !== "sk_test_placeholder") {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2026-01-28.clover",
  });
}

export function getStripe(): Stripe | null {
  return stripe;
}

export function isStripeConfigured(): boolean {
  return stripe !== null;
}
