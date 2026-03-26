import User from "../models/userModel.js";
import stripe from "../config/stripe.js";
export const stripeWeebHook = async (req, res) => {
  const sign = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sign,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Webhook error" });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const credits = Number(session.metadata.credits);
    const plan = session.metadata.plan;
    await User.findByIdAndUpdate(userId, { $inc: { credits }, plan });
  }
  return res.json({ received: true });
};
