import Container from '@/Component/Container'
import TotalCard from '@/Component/TotalCard'
import React from 'react'

function viewCard() {

  return (
    <div className='my-10 '>
        <Container>
            <h1 className='font-semibold text-3xl my-10'>View Card</h1>
            <div  className='grid w-full'>
                <div className='flex  items-center justify-between gap-8 p-3 border-b border-gray-300'>
                    <div className='w-[100px] h-[100px] bg-gray-200'></div>
                    <h1 className='font-bold'>product title</h1>
                    <h2 className="text-green-600 text-[18px] font-semibold">$50</h2>
                    <div className='flex gap-6 text-[18px] cursor-pointer items-center bg-white w-[120px]  rounded justify-center shadow-2xl cursor-pointer'>
                <button>+</button>
                <h2>10</h2>
                <button>-</button>
               </div>
               <button className="btn btn-soft btn-error">Remove Item</button>
                </div>
                <div className='flex justify-end'>

                <TotalCard/>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default viewCard