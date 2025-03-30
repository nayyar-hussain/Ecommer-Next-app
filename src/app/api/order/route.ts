import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../config/Database";
import Order from "../../../../Model/Order";

export async function POST(req: NextRequest) {
    try {
        await ConnectToDatabase()
        const body = await req.json()
        const { userId , cartItems , useraddress }  = body;
        

        if(!userId  || !cartItems || !useraddress) {
            return NextResponse.json({status : 400 , msg : "credential not geted"})

        }

       new Order({
            userId,
            cartItems,
            address : useraddress
        })


      
        return NextResponse.json({status : 200 , msg : "Order Placed"})
    } catch (error : any) {
        return NextResponse.json({ status  : 500 ,error : error.message})
    }
}

export async function GET(req:NextRequest) {
    try {
        await ConnectToDatabase()

        const orderData = await Order.find({}).populate({
            path: 'cartItems', // First populate the cartItems
            populate: {
                path: 'productId', // Then populate productId within each cartItem
                model: 'Product'   // Ensure this matches your Product model name
            }
        });
        if(orderData){
            return NextResponse.json({ status  : 200 , orderData})

        }
            } catch (error : any) {
        return NextResponse.json({ status  : 500 ,error : error.message})
    }
}