import mongoose from "mongoose";
const { Schema } = mongoose;

const operatorSchema = new Schema({
  MI_ID: {
    type: String,
    trim: true,
    required: true,
  },
  operator_name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

export default mongoose.model("operator", operatorSchema);
