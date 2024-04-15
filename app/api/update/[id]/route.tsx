import connectToMongoDB from "../../../../libs/mongodb";
import collections from "../../../../models/model";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    // Extract the contact ID from the request URL
    const id = request.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is missing" },
        { status: 400 }
      );
    }

    // Parse the request body
    const { name, gender, email, phone } = await request.json();

    // Connect to the MongoDB database
    await connectToMongoDB();

    // Check if the email already exists in another contact
    const existingContact = await collections.findOne({
      email,
      _id: { $ne: id },
    });
    if (existingContact) {
      return NextResponse.json(
        { error: "Email already in use by another contact" },
        { status: 400 }
      );
    }

    // Update the contact information
    const data = await collections.updateOne(
      { _id: id },
      { $set: { name, gender, email, phone } }
    );

    // Check if the update was successful
    if (data.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Contact not found or data not modified" },
        { status: 404 }
      );
    }

    // Return a success response
    return NextResponse.json(
      { message: "Data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    // Return a server error response
    return NextResponse.json(
      { error: "Failed to update data in MongoDB" },
      { status: 500 }
    );
  }
}
