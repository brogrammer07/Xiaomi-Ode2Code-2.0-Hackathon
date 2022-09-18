import mongoose from "mongoose";
const { Schema } = mongoose;

const sizeSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model("size", sizeSchema);
