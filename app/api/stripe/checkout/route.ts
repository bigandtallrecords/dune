import { NextRequest, NextResponse } from "next/server";

const GARDEN_API = process.env.GARDEN_API_URL || "https://gardenofthemind.io";

/**
 * POST /api/stripe/checkout
 * Proxies to a Stripe Checkout session for the $20/mo dune plan.
 * Auth is forwarded from the garden-goers session token.
 *
 * For now this is a stub — once STRIPE_PRICE_DUNE and STRIPE_SECRET_KEY
 * are configured, it will create a real Stripe Checkout session.
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const priceId = process.env.STRIPE_PRICE_DUNE;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!priceId || !stripeKey) {
    return NextResponse.json(
      { error: "Stripe not configured yet. Set STRIPE_PRICE_DUNE and STRIPE_SECRET_KEY env vars." },
      { status: 503 }
    );
  }

  try {
    // Verify user via garden API
    const meRes = await fetch(`${GARDEN_API}/api/users/me`, {
      headers: { Authorization: authHeader },
    });
    if (!meRes.ok) return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    const user = await meRes.json();

    // Dynamic import stripe
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email,
      subscription_data: {
        metadata: { userId: user.userId, product: "dune", tier: "dune" },
      },
      success_url: `${request.nextUrl.origin}/panel?subscribed=true`,
      cancel_url: `${request.nextUrl.origin}/panel?subscribe=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[dune/stripe/checkout]", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
