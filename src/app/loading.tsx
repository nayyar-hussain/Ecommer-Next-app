import React from 'react'

function loading() {
  return (
    <div className='h-screen w-full bg-white flex justify-center items-center'>
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  )
}

export default loading