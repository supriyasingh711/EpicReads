import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'



const MobileNav = () => {
  const role=useSelector((state)=>state.auth.role)

  return (
    <>
     {role==="user" && (
      <div className='w-full flex items-center justify-between my-8'>
      <Link to={"/profile"}
  className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
  >Favourites
  </Link>
  <Link to={"/profile/orderHistory"}
  className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
  >Order History
  </Link>
  <Link to={"/profile/settings"}
  className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
  >Settings
  </Link></div>
    )}
     {role==="admin" && (
      <div className='w-full flex items-center justify-center my-8'>
      <Link to={"/profile/all-orders"}
  className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
  >All Orders
  </Link>
  <Link to={"/profile/add-book"}
  className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
  >Add Book
  </Link>
  </div>
    )}
    </>
   
    
  )
}

export default MobileNav