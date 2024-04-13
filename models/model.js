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

const collections = mongoose.models.user || mongoose.model("user", model);

export default collections;
