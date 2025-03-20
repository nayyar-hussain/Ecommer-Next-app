"use client"
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cart = () => {

  const router = useRouter()

  return (
    
    <div  className="card bg-gray-100  shadow-sm p-2">
    <figure>
      <Image
      className="w-full"
      width={1000}
      height={1000}
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Card Title</h2>
      <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      <h2 className="text-green-600 text-3xl font-semibold">$50</h2>
      <div className="card-actions flex items-center justify-between">
        <button onClick={() => router.push(`/product/detail/1`)}  className="text-[16px] cursor-pointer">Detail</button>
        <button className="btn btn-primary"> <ShoppingCart /></button>
      </div>
    </div>
  </div>
  )
}

export default Cart