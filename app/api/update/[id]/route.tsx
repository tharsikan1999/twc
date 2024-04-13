import connectToMongoDB from "../../../../libs/mongodb";
import collections from "../../../../models/model";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();
    if (!id) {
      throw new Error("ID parameter is missing");
    }
    const { name, gender, email, phone } = await request.json();
    await connectToMongoDB();
    const data = await collections.updateOne(
      { _id: id },
      { $set: { name, gender, email, phone } }
    );
    return NextResponse.json({ message: "Data updated successfully", data });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update data in MongoDB");
  }
}
