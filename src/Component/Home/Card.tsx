import { ShoppingCart } from "lucide-react";

export default function () {
  return (
    
    <div className="card bg-gray-100  shadow-sm p-2">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Card Title</h2>
      <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      <h2 className="text-green-600 text-3xl font-semibold">$50</h2>
      <div className="card-actions justify-end">
        <button className="btn btn-primary"> <ShoppingCart /></button>
      </div>
    </div>
  </div>
  )
}
