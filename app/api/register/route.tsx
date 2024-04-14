import connectToMongoDB from "../../../libs/mongodb";
import collections from "../../../models/register";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Connect to MongoDB
    await connectToMongoDB();

    // Parse the request body
    const { email, password } = await request.json();

    // Check if the user already exists
    const existingUser = await collections.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists." },
        { status: 409 }
      );
    }

    // Create a new user
    await collections.create({ email, password });

    // Return success response
    return NextResponse.json(
      { message: "Data added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add data to MongoDB:", error);

    // Return error response
    return NextResponse.json(
      { error: "Failed to add data to MongoDB" },
      { status: 500 }
    );
  }
}
