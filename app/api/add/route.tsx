import connectToMongoDB from "../../../libs/mongodb";
import collections from "../../../models/model";
import User from "../../../models/user";
import { NextResponse, NextRequest } from "next/server";
import validateToken from "../../../middleware/validateToken"; // Import the validateToken middleware

interface ExtendedNextRequest extends NextRequest {
  user: {
    _id: string;
    gender: string;
    name: string;
    email: string;
    phone: string;
    userID: string;
  };
}

export async function POST(req: ExtendedNextRequest) {
  const tokenValidation = await validateToken(req);
  if (tokenValidation) {
    return tokenValidation;
  }

  try {
    // Get the userID from the request object
    const userID = req.user._id;

    const { name, gender, email, phone } = await req.json();

    // Connect to MongoDB
    await connectToMongoDB();

    // Insert data into collections
    const newDocument = await collections.create({
      userID,
      name,
      gender,
      email,
      phone,
    });

    return NextResponse.json(
      { message: "Data added successfully", data: newDocument },
      { status: 201 } // Created status code
    );
  } catch (error) {
    console.error("Error adding data to MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to add data to MongoDB" },
      { status: 500 } // Internal server error status code
    );
  }
}
