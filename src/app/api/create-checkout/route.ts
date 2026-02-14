import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { generateRoast } from "@/lib/roast-generator";
import { saveRoast } from "@/lib/roast-store";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // If Stripe is configured, create a checkout session
    if (isStripeConfigured()) {
      const stripe = getStripe()!;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Landing Page Roast",
                description: `Landing page roast for ${new URL(url).hostname} — scored across 8 categories with fixes`,
              },
              unit_amount: 900, // €9.00
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/api/roast?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/#submit`,
        metadata: {
          url,
        },
      });

      return NextResponse.json({ checkoutUrl: session.url });
    }

    // Demo mode: generate roast directly without payment
    const roast = await generateRoast(url);
    saveRoast(roast);

    return NextResponse.json({ roastId: roast.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
