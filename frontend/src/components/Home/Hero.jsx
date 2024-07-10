import React from 'react'
import home from "../../assets/3.jpg"
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className='md:h-[75vh] flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full mb-12 p-5 lg:w-3/6  flex flex-col items-start justify-center lg:items-start'>
        <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>Unlock  your ideal book retreat.</h1>
        <p className='mt-4 text-xl text-zinc-300'>
        Welcome to EpicReads, your ultimate online destination for books of all genres. Whether you're looking for the latest bestsellers, timeless classics, or hidden gems, our extensive collection and personalized recommendations ensure you'll find your next great read. Enjoy seamless browsing, exclusive discounts, and fast shipping with every purchase.
        </p>
        <div className='mt-8'>
        <Link to={"/books"} 
        className='text-yellow-100 text-2xl font-semibold border border-yellow-100 mt-4 px-10 py-3 hover:bg-zinc-800 rounded-full text-center'>
          Lets' Read</Link>
        </div>
      
        </div>
        <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
        <img src={home} alt="" /></div>
    </div>
  )
}

export default Hero