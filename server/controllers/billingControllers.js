import { PLANS } from "../config/plan.js";
import Stripe from "stripe";

export const billing = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const { planType } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const planKey = planType.toLowerCase();
    const plan = PLANS[planKey];

    if (!plan || plan.price === 0) {
      return res.status(400).json({ message: "invalid paid plan" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `autocanvas.ai ${planKey.toUpperCase()} plan`,
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId.toString(),
        credits: String(plan.credits),
        plan: planKey,
      },
      success_url: `${process.env.FRONTEND_URL}/`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    return res.status(200).json({ sessionUrl: session.url });
  } catch (error) {
    console.log("Billing Controller Error: ", error);
    return res.status(500).json({ message: "Billing error" });
  }
};
