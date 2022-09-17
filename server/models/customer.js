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
  },
  coc: {
    type: String,
  },
  addresses: [{ type: Schema.Types.ObjectId, ref: "address" }],
});

export default mongoose.model("customer", customerSchema);
