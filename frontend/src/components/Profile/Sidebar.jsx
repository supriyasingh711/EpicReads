import React from 'react'
import { Link } from 'react-router-dom'
// import FaArrowRightFromBracket from "react-icons/fa"
const Sidebar = ({data}) => {
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]'>
<div className='flex items-center flex-col justify-center'>
<img src={data.avatar} className='h-[10vh]' alt="" />
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.username}</p>
        <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
</div>
        <div className='w-full flex flex-col items-center justify-center '>
        <Link to={"/profile"}
        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
        >Favourites</Link>
        <Link to={"/profile/orderHistory"}
        className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
        >Order History</Link>
        <Link to={"/profile/settings"}
        className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'
        >Settings</Link>
        </div>
        
<button className='bg-zinc-900 w-3/6 lg:w-full m-4 p-4 lg:mt-0 text-white font-semibold flex items-center justify-center hover:bg-zinc-700'>
Log Out 

</button>
    </div>
  )
}

export default Sidebar