import AddresFrom from '@/Component/AddresFrom'
import Container from '@/Component/Container'
import TotalCard from '@/Component/TotalCard'
import React from 'react'

function OrderPlace() {
    return (
        <div className='my-10'>
            <Container>
                <h1 className='font-semibold text-3xl'>Place Your Order</h1>
                <div className='flex flex-col md:flex-row justify-between items-center gap-5'>
                    <AddresFrom/>
                    <TotalCard />
                </div>
            </Container>

        </div>
    )
}

export default OrderPlace