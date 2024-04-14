import connectToMongoDB from "../../../libs/mongodb";
import collections from "../../../models/register";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { email, password } = await request.json();
    await connectToMongoDB();
    await collections.create({ email, password });
    return NextResponse.json(
      { message: "Data added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add data to MongoDB");
  }
}
