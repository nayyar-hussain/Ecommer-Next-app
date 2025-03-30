import { AlignJustify } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <div className="z-10 drawer my-15">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button"><AlignJustify /></label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-70 p-4">
      {/* Sidebar content here */}
      <h1 className='text-3xl font-semibold my-10'>Admin Panel</h1>
      <li className='bg-black- border-r-4 border-black'><Link href="/">Home</Link></li>
      <li><Link href="/admin/dashboard/add-products">Add Product</Link></li>
      <li><Link href="/admin/dashboard/view-orders">View Orders</Link></li>
      <li><Link href="/admin/dashboard/view-products">View Products</Link></li>
    </ul>
  </div>
</div>
  )
}

export default Sidebar