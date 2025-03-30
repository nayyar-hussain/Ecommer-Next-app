import Sidebar from '@/Component/Admin/Sidebar'
import Container from '@/Component/Container'
import React, { ReactNode } from 'react'

function LayoutAdmin({children} : {children : ReactNode}) {
  return (
    <div className=''>
        <Container>

        <div className='my-10 '>
            <Sidebar/>
            {children}
        </div>
        </Container>
    </div>
  )
}

export default LayoutAdmin