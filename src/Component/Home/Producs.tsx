import React from 'react'
import Container from '../Container'
import Card from './Card'

export default function Producs() {
  return (
    <Container>
        
        <div className='my-10'>
            <h1 className='text-2xl font-medium my-10'>Products</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
               <Card/> 
               <Card/> 
               <Card/> 
               <Card/> 
               <Card/> 
               <Card/> 
            </div>
        </div>
    </Container>
  )
}
