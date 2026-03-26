import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import websiteRouter from "./routes/websiteRoutes.js";
import billingRouter from "./routes/billingRoutes.js";
import { stripeWeebHook } from "./controllers/stripeWebhook.js";
const port = process.env.PORT || 8000;
const app = express();
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWeebHook,
);
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/billing", billingRouter);
app.use("/api/auth", authRouter);
app.use("/api/website", websiteRouter);
app.use("/api/user", userRouter);
connectDB();
app.listen(port, () => {
  console.log("SERVER STARTED");
});
