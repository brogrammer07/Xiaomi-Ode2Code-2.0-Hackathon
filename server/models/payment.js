import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema({
  razorpay_payment_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_signature: { type: String, required: true },
});

export default mongoose.model("payment", paymentSchema);
