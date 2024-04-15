import { NextResponse } from "next/server";
import User from "../models/user";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

const validateToken = async (req) => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // Return a 401 Unauthorized response if the token is not provided
    return NextResponse.json(
      { error: "Unauthorized: Token not provided" },
      { status: 401 }
    );
  }

  try {
    // Verify the token using the secret
    const verifiedToken = jwt.verify(token, jwtSecret);
    // Retrieve the user based on the token ID
    const user = await User.findById(verifiedToken.userId).select("-password");

    if (!user) {
      // Return a 401 Unauthorized response if the user is not found
      return NextResponse.json(
        { error: "Unauthorized: User not found" },
        { status: 401 }
      );
    }

    // Attach the user to the request context

    req.user = user;

    return null;

    // If token is valid and user is found, attach the user to the request context and proceed
  } catch (error) {
    console.error(error);
    // Return a 401 Unauthorized response if the token is invalid or expired
    return NextResponse.json(
      { error: "Unauthorized: Invalid or expired token" },
      { status: 401 }
    );
  }
};

export default validateToken;
