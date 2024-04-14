import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          // Email format validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Don't include password field when querying
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password before saving the user
userSchema.pre("save", async function (next) {
  // Check if password is modified or new
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    // Pass the error to the next middleware
    console.error("Error hashing password:", error);
    next(error);
  }
});

const User = mongoose.models.register || mongoose.model("register", userSchema);

export default User;
