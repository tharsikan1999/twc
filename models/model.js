import mongoose, { Schema } from "mongoose";

const model = new Schema(
  {
    name: String,
    gender: String,
    email: String,
    phone: String,
  },

  {
    timestamps: true,
  }
);

const collections = mongoose.models.Contact || mongoose.model("Contact", model);

export default collections;
