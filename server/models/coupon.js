import mongoose from "mongoose";
const { Schema } = mongoose;

const couponSchema = new Schema({
  couponCode: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  valid: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("coupon", couponSchema);
