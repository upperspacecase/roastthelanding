import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { generateRoast } from "@/lib/roast-generator";
import { saveRoast } from "@/lib/roast-store";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!sessionId) {
    return NextResponse.redirect(new URL("/#submit", baseUrl));
  }

  try {
    if (isStripeConfigured()) {
      const stripe = getStripe()!;
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status !== "paid") {
        return NextResponse.redirect(new URL("/#submit", baseUrl));
      }

      const url = session.metadata?.url;
      if (!url) {
        return NextResponse.redirect(new URL("/#submit", baseUrl));
      }

      // Generate the roast
      const roast = await generateRoast(url);
      saveRoast(roast);

      return NextResponse.redirect(new URL(`/roast/${roast.id}`, baseUrl));
    }

    // Demo mode fallback
    return NextResponse.redirect(new URL("/#submit", baseUrl));
  } catch (error) {
    console.error("Roast generation error:", error);
    return NextResponse.redirect(new URL("/#submit", baseUrl));
  }
}
