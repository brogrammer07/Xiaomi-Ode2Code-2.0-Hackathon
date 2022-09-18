import mongoose from "mongoose";
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  coc: {
    type: String,
  },
  addresses: [{ type: Schema.Types.ObjectId, ref: "address" }],
  points: {
    type: Number,
    default: 0,
  },
  orders: [{ type: Schema.Types.ObjectId, ref: "order" }],
});

export default mongoose.model("customer", customerSchema);
