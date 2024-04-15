import connectToMongoDB from "../../../libs/mongodb";
import collections from "../../../models/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

export async function POST(request: NextRequest) {
  const jwtSecret = process.env.JWT_SECRET;

  try {
    // Connect to MongoDB
    await connectToMongoDB();

    // Parse the request body
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    // Find the user by email
    const user = await collections.findOne({ email });

    // If user does not exist, return an error response
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return an error response
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Generate a JWT token with expiration time
    const token = jwt.sign(
      { userId: user._id },
      jwtSecret,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return a success response with a message and user's information
    return NextResponse.json(
      { message: "Login successful.", user: { email: user.email }, token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to authenticate user:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Failed to authenticate user." },
      { status: 500 }
    );
  }
}
