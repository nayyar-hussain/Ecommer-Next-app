import Container from '@/Component/Container';
import { IProduct } from '@/Component/Home/Producs';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

// Define the API response type
interface ApiResponse {
  products: IProduct[];
}

// Define the props type for the page
interface ProductDetailProps {
  params: { id: string };
}

async function ProductDetail({ params }: ProductDetailProps) { 
  const { id } = params; // Extract id from params

  try {
    const res = await axios.get<ApiResponse>('http://localhost:3000/api/product/add', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const products = res.data.products || [];
    
    const detail = products.find((prod) => prod._id === id);

    // Handle case where no product is found
    if (!detail) {
      return (
        <Container>
          <div className="my-10">
            <h1 className="text-3xl font-semibold my-10">Product Not Found</h1>
            <p className="text-gray-500">Sorry, we couldn’t find a product with ID: {id}</p>
            <p className="text-gray-500">Available IDs: {products.map(p => p._id).join(', ')}</p>
          </div>
        </Container>
      );
    }

    return (
      <div className="my-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="h-[400px] relative">
              <Image
                src={detail.imageUrl || 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'}
                alt={detail.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="grid gap-5">
              <h1 className="font-bold text-3xl">{detail.name}</h1>
              <p className="text-gray-600 text-[14px] md:text-[18px]">
                {detail.description || 'No description available.'}
              </p>
              <div className="flex gap-6 text-2xl items-center bg-white w-[120px] rounded justify-center shadow-2xl cursor-pointer">
                <button>+</button>
                <h2>10</h2>
                <button>-</button>
              </div>
              <h2 className="text-green-700 text-3xl font-semibold">${detail.price}</h2>
              <button className="bg-primary text-primary-content flex items-center justify-center gap-2 font-medium rounded py-2">
                Add To Cart <ShoppingCart />
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product details:', error);
    return (
      <Container>
        <div className="my-10">
          <h1 className="text-3xl font-semibold my-10">Error</h1>
          <p className="text-red-500">Failed to load product details</p>
        </div>
      </Container>
    );
  }
}

export default ProductDetail;