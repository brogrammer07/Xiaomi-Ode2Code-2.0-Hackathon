import { instance } from "../index.js";
import crypto from "crypto";
import Payment from "../models/payment.js";
export const checkout = async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: Math.round(Number(amount * 100)), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  console.log(order);
  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await Payment.create({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });
    // res.redirect(
    //   `${process.env.CLIENT_URL}/paymentsuccess?reference=${razorpay_payment_id}`
    // );
    return res.status(200).json("Paymen Successfull");
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
