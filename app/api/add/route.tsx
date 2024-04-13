import connectToMongoDB from "../../../libs/mongodb";
import collections from "../../../models/model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { name, gender, email, phone } = await request.json();
    await connectToMongoDB();
    await collections.create({ name, gender, email, phone });
    return NextResponse.json(
      { message: "Data added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add data to MongoDB");
  }
}
