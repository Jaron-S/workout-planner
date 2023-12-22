import Stripe from "stripe";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.redirect(new URL("/path-to-redirect", request.url));
  }

  const { amount } = await request.json();
  const amountInCents = Math.round(amount * 100);

  const requestUrl = new URL(request.url);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${requestUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${requestUrl.origin}/cancel`,
    });

    return new NextResponse(JSON.stringify({ sessionId: session.id }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating Stripe session:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.error("Unknown error:", error);
      return new Response(
        JSON.stringify({ error: "An unknown error occurred" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
}
