"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

// Define the expected order interface based on your backend schema
interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  cartItems: CartItem[];
  address: {
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
  status: string;
  createdAt: string;
}

const ViewOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleFetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order");
      setOrders(data.orderData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchOrders();
  }, []);

  // Calculate total for each order
  const calculateTotal = (cartItems: CartItem[]): number => {
    return cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0
    );
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 my-10">View Orders</h1>

      <div className="bg-white shadow-md rounded-lg overflow-auto">
        <table className="min-w-full cursor-pointer">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.address.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.cartItems
                    .map((item) => item.productId.name)
                    .join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${calculateTotal(order.cartItems).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;