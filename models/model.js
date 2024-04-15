import mongoose, { Schema } from "mongoose";
import User from "../models/user";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Female",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email format!`,
      },
    },
    phone: {
      type: String,
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact =
  mongoose.models.contact || mongoose.model("contact", contactSchema);

export default Contact;
