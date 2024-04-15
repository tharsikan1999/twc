import connectToMongoDB from "../../../libs/mongodb"; // Import the function to connect to MongoDB
import collections from "../../../models/model"; // Import the Mongoose model for the collection
import { NextResponse, NextRequest } from "next/server";
import validateToken from "../../../middleware/validateToken"; // Import the validateToken middleware

interface ExtendedNextRequest extends NextRequest {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export async function GET(req: ExtendedNextRequest, res: NextResponse) {
  // Apply the validateToken middleware
  const tokenValidation = await validateToken(req);
  if (tokenValidation) {
    return tokenValidation;
  } else {
    try {
      // Connect to MongoDB
      await connectToMongoDB();

      // Get the userID from the request object
      const userID = req.user._id;

      // Fetch data from the collection using the userID query
      const data = await collections.find({ userID: userID });

      // Check if data was found
      if (data) {
        // Return the data as JSON
        return NextResponse.json({ data });
      } else {
        // Return a 404 error if no data was found
        return NextResponse.json(
          { error: "No data found for the given user ID" },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error("Failed to get data from MongoDB:", error);
      // Return a 500 error if something goes wrong
      return NextResponse.json(
        { error: "Failed to get data from MongoDB" },
        { status: 500 }
      );
    }
  }
}
