"use client"
import {  useClerk, UserButton } from "@clerk/nextjs"
import Container from "./Container"
import { useAppContext } from "@/store/context"
import { useRouter } from "next/navigation"


function Navbar() {

  const router = useRouter()

  const {openSignIn} = useClerk()
  const { user } = useAppContext()
  return (
   <div className="w-full text-black">
    <Container>
        
    <header className="navbar shadow-y shadow-sm ">
  <div className="flex-1">
    <h1 className=" btn-ghost text-xl cursor-pointer" onClick={() => router.push('/')}>Store</h1>
  </div>
  <div className="flex items-center gap-1 ">
    <div className="dropdown dropdown-end mx-2">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow text-black">
        <div className="card-body">
          <span className="text-lg font-bold">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button onClick={() => router.push('/product/ViewCard')} className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end ">
    {user ? (
        // If the user is authenticated, display their information
        <div>
          <UserButton/>
        </div>
      ) : (
        // If the user is not authenticated, show a sign-in button
        <button onClick={() => openSignIn()} className="btn btn-primary">
          Sign In
        </button>
      )}
     
    </div>
  </div>
</header>
    </Container>
   </div>

  )
}

export default Navbar