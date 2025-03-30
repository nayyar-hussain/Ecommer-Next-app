import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../config/Database";
import Cart from "../../../../Model/AddToCard";
export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await ConnectToDatabase();

    // Extract userId from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    console.log("Received userId:", userId);

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" }, // Fixed status/msg structure
        { status: 400 }
      );
    }

    // Fetch cart data with populated productId
    const userCartData = await Cart.find({ userId }).populate('productId')

    // Check if cart is empty
    if (!userCartData || userCartData.length === 0) {
      return NextResponse.json(
        { message: "No items found in cart" },
        { status: 200 }
      );
    }

    // Return successful response
    return NextResponse.json(
      { message: "Cart retrieved successfully",  userCartData }, // Renamed userCartData to data
      { status: 200 }
    );
  } catch (error: any) {
    // Log the error for debugging
    console.error("Server error in GET /api/cart:", error);

    // Return a detailed error response
    return NextResponse.json(
      {
        message: "Server error",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}