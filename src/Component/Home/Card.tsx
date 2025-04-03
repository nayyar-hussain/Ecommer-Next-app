"use client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IProduct } from "./Producs";
import { useAppContext } from "@/store/context";

const Card = ({ pId, name, description, price, imageUrl }: IProduct) => {
  const router = useRouter();
  const { handleAddToCart, setquantityCal } = useAppContext();

  return (
    <div className="card bg-gray-100 shadow-sm">
      <figure>
        <Image
          className="object-cover w-full h-[300px]"
          width={500}
          height={200}
          src={imageUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
          alt={name || "Product"}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description?.slice(0, 200)}...</p>
        <h2 className="text-green-600 text-3xl font-semibold">${price}</h2>
        <div className="card-actions flex items-center justify-between">
          <button
            onClick={() => router.push(`/product/detail/${pId || "1"}`)}
            className="text-[16px] cursor-pointer"
          >
            Detail
          </button>
          <button
            onClick={() => {
              if (pId) {
                handleAddToCart({ pId });
              } else {
                alert("Product ID is missing");
              }
              setquantityCal("increment");
            }}
            className="btn btn-primary"
          >
            <ShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;