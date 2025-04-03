"use client"
import React, { useEffect, useState } from 'react';
import {  IProduct } from '@/Component/Home/Producs';
import axios from 'axios';

interface ApiResponse {
  products : IProduct[]
}

// interface IProduct {
//   _id? : string
//   name : string,
//   description : string,
//   imageUrl : string,
//   price : string,
//   createAt : string
// }

 export const ViewProducts =  () => {

  const [products, setproducts] = useState<IProduct[]>([])
  const fetchProducts = async () => {
    try {
      const res = await axios.get<ApiResponse>('http://localhost:3000/api/product/add');
      setproducts(res.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
   fetchProducts()
  }, [])


  const deleteroducts = async (id : string) => {
    try {
      const {data} = await axios.delete(`http://localhost:3000/api/product/add?id=${id}`);
      console.log(data);
      
     if(data.success == 200){
      fetchProducts()
     }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">View Products</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{product.description.slice(0,100)} <b>...</b> </p>
              <p className="text-lg font-bold text-gray-900 mb-4">
               ${product.price}
              </p>

              {/* Delete Button */}
              <button
              onClick={() => product._id && deleteroducts(product._id)}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;