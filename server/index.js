import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import operatorRoutes from "./routes/operator.js";
import customerRoutes from "./routes/customer.js";
import couponRoutes from "./routes/coupon.js";
import paymentRoutes from "./routes/payment.js";
import orderRoutes from "./routes/order.js";
import productRoutes from "./routes/product.js";
import Razorpay from "razorpay";
const app = express();
dotenv.config({ path: "./config/config.env" });
// middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

// set routes
app.use("/api", operatorRoutes);
app.use("/api", customerRoutes);
app.use("/api", couponRoutes);
app.use("/api", paymentRoutes);
app.use("/api", orderRoutes);
app.use("/api", productRoutes);
// Set Port
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Chat Buddy API");
});

//Razorpay

export const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log("MongoDB Error", error.message));
