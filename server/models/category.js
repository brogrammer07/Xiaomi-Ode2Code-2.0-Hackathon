import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "product" }],
  colours: [{ type: Schema.Types.ObjectId, ref: "colour" }],
  sizes: [{ type: Schema.Types.ObjectId, ref: "size" }],
});

export default mongoose.model("category", categorySchema);
