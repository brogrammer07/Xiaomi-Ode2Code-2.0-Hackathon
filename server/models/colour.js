import mongoose from "mongoose";
const { Schema } = mongoose;

const colourSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
});

export default mongoose.model("colour", colourSchema);
