import React from 'react';
import Container from '../Container';
import Card from './Card';
import axios from 'axios';

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  pId?: string;
}

// Define the expected API response type
export interface ApiResponse {
  products: IProduct[];
}

export default async function Products() {
  try {
    const res = await axios.get<ApiResponse>('http://localhost:3000/api/product/add', {
     
      
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const products = res.data.products || []; // Fallback to empty array if products is undefined

    // Optional: Check if products array is empty
    if (!products.length) {
      return (
        <Container>
          <div className="my-10">
            <h1 className="text-3xl font-semibold my-10">Products</h1>
            <p className="text-gray-500">No products available at the moment.</p>
          </div>
        </Container>
      );
    }

    return (
      <Container>
        <div className="my-10">
          <h1 className="text-3xl font-semibold my-10">Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((product) => (
              <Card
                key={product._id}
                pId={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <Container>
        <div className="my-10">
          <h1 className="text-3xl font-semibold my-10">Products</h1>
          <p className="text-red-500">Failed to load products</p>
        </div>
      </Container>
    );
  }
}