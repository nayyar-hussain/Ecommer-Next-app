import Container from '@/Component/Container'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

function ProductDetail() {
  return (
    
    <div className='my-10'>
        <Container>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='h-[400px] bg-gray-200'></div>
            <div className='grid gap-5'>
                <h1 className='font-bold text-3xl '>Product Title</h1>
                <p className='text-gray-800 text-sm md:text-[18px]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab eveniet ullam quidem sit voluptas quisquam eum hic vitae quia! Repellat commodi voluptate voluptatum accusantium culpa quo ipsum neque distinctio.</p>
               <div className='flex gap-6 text-2xl items-center bg-white w-[120px]  rounded justify-center shadow-2xl cursor-pointer'>
                <button>+</button>
                <h2>10</h2>
                <button>-</button>
               </div>
                <h2 className='text-green-700 text-3xl font-semibold'>$5000</h2>
                <button className='bg-primary text-primary-content flex items-center justify-center gap-2 font-medium rounded py-2'>Add To Cart <ShoppingCart/></button>
            </div>
        </div>
        </Container>
    </div>
  )
}

export default ProductDetail