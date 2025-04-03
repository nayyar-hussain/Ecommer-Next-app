"use client";
import Container from "@/Component/Container";
import TotalCard from "@/Component/TotalCard";
import { useAppContext } from "@/store/context";

function ViewCart() {
   
  const { loading , cartItems , totalPrice   , setquantityCal}  = useAppContext()

  if (loading) {
    return (
      <div className="my-10">
        <Container>
          <p>Loading...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="my-10">
      <Container>
        <h1 className="font-semibold text-3xl my-10">View Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid w-full">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-8 p-3 border-b border-gray-300"
              >
                <div className="w-[100px] h-[100px] bg-gray-200">
                  {item.productId.imageUrl && (
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h1 className="font-bold">{item.productId.name}</h1>
                <h2 className="text-green-600 text-[18px] font-semibold">
                  ${item.productId.price}
                </h2>
                <div className="flex gap-6 text-[18px] items-center bg-white w-[120px] rounded justify-center shadow-2xl cursor-pointer">
                  <button onClick={() => setquantityCal("increment")}>+</button>
                  <h2>{item.quantity}</h2>
                  <button onClick={() => setquantityCal("decrement")}>-</button>
                </div>
                <button className="btn btn-soft btn-error">Remove Item</button>
              </div>
            ))}
            <div className="flex justify-end">
              <TotalCard totalPrice={totalPrice}/>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ViewCart;