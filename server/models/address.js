import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new Schema({
  fullAddress: { type: String, required: true },
  town: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
});

export default mongoose.model("address", addressSchema);
