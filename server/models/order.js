import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderId: { type: String, required: true },
    productSN: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cgst: {
      type: Number,
      required: true,
    },
    sgst: {
      type: Number,
      required: true,
    },
    coupon: {
      couponCode: { type: String },
      coupon: { type: Number },
    },
    points: {
      type: Number,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMode: { type: String, required: true },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "payment",
    },
    deliveryMode: { type: String, required: true },
    address: {
      type: Schema.Types.ObjectId,
      ref: "address",
    },
    customer: { type: Schema.Types.ObjectId, ref: "customer" },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
