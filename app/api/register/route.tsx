import connectToMongoDB from "../../../libs/mongodb";
import collections from "../../../models/register";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectToMongoDB();

    // Parse the request body
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    // Check if the user already exists
    const existingUser = await collections.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists." },
        { status: 409 }
      );
    }

    // Create a new user
    const newUser = new collections({ email, password });
    await newUser.save();

    // Return success response
    return NextResponse.json(
      { message: "Data added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add data to MongoDB:", error);

    // Narrowing the type of error
    if (error instanceof Error) {
      // Handle specific error types
      if (error.name === "ValidationError") {
        // Handle validation errors (e.g., invalid email format)
        return NextResponse.json(
          { error: "Validation error: " + error.message },
          { status: 400 }
        );
      }

      // Use type assertion to access the 'code' property
      const mongoError = error as { code?: number };
      if (mongoError.code === 11000) {
        // Handle duplicate key errors (e.g., email already exists)
        return NextResponse.json(
          { error: "Email already exists." },
          { status: 409 }
        );
      }
    }

    // Handle unexpected errors
    return NextResponse.json(
      { error: "Failed to add data to MongoDB" },
      { status: 500 }
    );
  }
}
