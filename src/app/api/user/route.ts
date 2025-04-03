import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../../config/Database";
import Order from "../../../../Model/Order";

export async function GET(req: NextRequest) {
    try {
       const { searchParams } = new URL(req.url)
       const userid = searchParams.get('userid')
       if(!userid) {
            return NextResponse.json({status : 400 , msg : "credential not geted"})
        }
        await ConnectToDatabase()
        const orderData = await Order.find({userId : userid}).populate({
            path : "cartItems",
            populate : {
                path : "productId",
                model : "Product"
            }
        })
        if(orderData){
            return NextResponse.json({ status  : 200 , orderData})
        }else {
            return NextResponse.json({ status  : 400 , msg : "No Order Found"})
        }
    } catch (error) {
        return NextResponse.json({ status  : 500 ,error : "Internal Server Error"})
    }
}