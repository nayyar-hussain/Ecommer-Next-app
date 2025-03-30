"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

interface ITotalPrice {
   totalPrice : number
}
function TotalCard({totalPrice} : ITotalPrice) {


    const router = useRouter()
  return (
    <div className=' flex flex-col gap-5 my-30 w-full md:w-[400px] '>
    <h1 className='text-2xl font-bold'>Order Processing</h1>
    <div className='border-b border-gray-300 py-3 flex items-center justify-between'>
        <h3 className='font-bold'>Price</h3>
        <h3 className='text-green-600 font-bold'>${totalPrice}</h3>
    </div>
    <div className='border-b border-gray-300 py-3 flex items-center justify-between'>
        <h3 className='font-bold'>Shipping Fee</h3>
        <h3 className='text-green-600 font-bold'>$10</h3>
    </div>
    <div className='border-b border-gray-300 py-3 flex items-center justify-between'>
        <h3 className='font-bold'>Total Amount</h3>
        <h3 className='text-green-600 font-bold'>${totalPrice + 10}</h3>
    </div>
    <div>
        <button onClick={() => router.push(`/product/OrderPlace`)} className='btn bg-primary text-primary-content py-5 font-semibold w-full'>Process You Order</button>
    </div>
</div>
  )
}

export default TotalCard