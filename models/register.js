const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // Validate email format
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
    // Convert email to lowercase
    set: (value) => value.toLowerCase(),
  },
  password: {
    type: String,
    required: true,
    // Minimum length of 8 characters for password
    minLength: [8, "Password must be at least 8 characters long."],
    // Add a custom validation function for password strength
    validate: {
      validator: function (value) {
        // At least one uppercase letter, one lowercase letter, and one number
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    },
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
