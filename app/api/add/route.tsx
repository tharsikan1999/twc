import connectToMongoDB from "../../../libs/mongodb";
import collections from "../../../models/model";
import User from "../../../models/user";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userID, name, gender, email, phone } = await request.json();

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
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding data to MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to add data to MongoDB" },
      { status: 500 }
    );
  }
}
