// pages/api/get.js

import connectToMongoDB from "../../../libs/mongodb";
import collections from "../../../models/model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongoDB();

    const data = await collections.find();

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get data from MongoDB");
  }
}
