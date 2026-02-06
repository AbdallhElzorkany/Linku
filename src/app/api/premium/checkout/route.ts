import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      allow_promotion_codes: true,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1SxchzFIkEfh3D3h7gY91Dgc",
          quantity: 1,
        },
      ],
      success_url: `${origin}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      mode: "payment",
    });
    return NextResponse.redirect(session.url!, 303);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
