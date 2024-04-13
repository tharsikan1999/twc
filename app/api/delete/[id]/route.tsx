import connectToMongoDB from "../../../../libs/mongodb";
import collections from "../../../../models/model";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const id = request.nextUrl.pathname.split("/").pop(); // Extract ID from the last segment of the pathname
    if (!id) {
      throw new Error("ID parameter is missing");
    }
    await connectToMongoDB();
    const data = await collections.deleteOne({ _id: id });
    return NextResponse.json({ message: "Data deleted successfully", data });
    // Log the retrieved 'id' value
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete data from MongoDB");
  }
}
