import React from 'react'

const Hero = () => {
  return (
    <div className='h-[75vh]'>
        <div className='w-3/6'>
        <h1 className='text-6xl font-semibold text-yellow-100'>Unlock  your ideal book retreat.</h1>
        <p className='mt-4 text-xl text-zinc-300'>
        Welcome to EpicReads, your ultimate online destination for books of all genres. Whether you're looking for the latest bestsellers, timeless classics, or hidden gems, our extensive collection and personalized recommendations ensure you'll find your next great read. Enjoy seamless browsing, exclusive discounts, and fast shipping with every purchase.
        </p>
        <div className='text-yellow-100 text-2xl font-semibold border border-yellow-100 mt-4 px-10 py-2 hover:bg-zinc-800 rounded-full text-center'>Lets' Read</div>
        </div>
        <div className='w-3/6'></div>
    </div>
  )
}

export default Hero