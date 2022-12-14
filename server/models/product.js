import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  SN: { type: String, required: true },
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model("product", productSchema);
