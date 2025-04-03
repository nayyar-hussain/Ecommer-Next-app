import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../config/Database";
import Cart from "../../../../Model/AddToCard";

export async function POST(req: NextRequest) {
  try {
    const { productId, userId, quantity, quantityCal } = await req.json();

    if (!productId || !userId) {
      return NextResponse.json({ msg: "Product or user not found" }, { status: 400 });
    }

    if (typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json({ msg: "Invalid quantity" }, { status: 400 });
    }

    await ConnectToDatabase();

    const cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      if(quantityCal === "increment") {

        cartItem.quantity += quantity;
      } else if(quantityCal === "decrement") {
        cartItem.quantity -= quantity;
      }
      if (cartItem.quantity < 1) {
        cartItem.quantity = 1; // Ensure quantity doesn't go below 1
      }
      await cartItem.save();
      return NextResponse.json(
        { message: "Product updated cart", },
        { status: 201 }
      );
    } else {
      const newCartItem = new Cart({ userId, productId, quantity });
      await newCartItem.save();

      return NextResponse.json(
        { message: "Product added to cart", },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}


