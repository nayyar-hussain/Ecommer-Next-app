"use client";
import Container from '@/Component/Container';
import { useAppContext } from '@/store/context';
import React, { useEffect, useState } from 'react'

function ViewOrderOfUser() {

  interface CartItem {
    _id: string;
    productId: {  
      _id: string;
      name: string;
      price: number;
    }
    quantity: number;
  }

  interface Order {
    _id: string;
    userId: string;
    cartItems: CartItem[];
    status: string;
    createdAt: string;
  }
 

  const {userId , isLoaded} = useAppContext()
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchUserOrders = async () => {
    try {

      if(!isLoaded) {
        return <div>Loading...</div>; // Handle loading state as needed
      }
      if(!userId) {
        return <div>User not found</div>; // Handle user not found state as needed
      }

      const response = await fetch(`/api/user?userid=${userId}`); // Replace with actual user ID
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.orderData); // Assuming orderData is the correct field in the response
      console.log(data); // Handle the fetched order data as needed
    } catch (error) {
      console.error(error);
    }
  }
    useEffect(() => {
      fetchUserOrders(); // Fetch orders when the component mounts
    }, []); // Add userId as a dependency to refetch when it changes
   
    
 
  
 
 
  

  return (
    <Container>

    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 my-10">View Orders</h1>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-auto">
        <table className="min-w-full cursor-pointer">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
             
             
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
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
                  {new Date(order.createdAt).toLocaleDateString()} {/* Format date as needed */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Container>
  );
};


export default ViewOrderOfUser