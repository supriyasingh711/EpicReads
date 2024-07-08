import React from 'react'
import logo from "../../assets/open-book.png"
const Navbar = () => {
    const links=[
        {
            title:"Home",
            link:"/"
        },
        {
            title:"About Us",
            link:"/about-us"
        },
        {
            title:"Books",
            link:"/all-books"
        },{
            title:"Cart",
            link:"/cart"
        },
        {
            title:"Profile",
            link:"/profile"
        }
    ]



  return (
    <div className='bg-zinc-800 text-white px-4 py-8 flex items-center justify-between'>
        <div className='flex items-center '>
            <img 
            className='h-10 me-4'
            src={logo} alt="logo" />
            <h1 className='text-2xl font-semibold'>EpicReads</h1>
        </div>
        <div>

            <div className='nav-link-epicreads flex items-center gap-4'>
                <div className='flex gap-4'>
                {links.map((items,i)=>
                <div className='hover:text-blue-50 transition-all duration-300' key={i}>{items.title}</div>
                )}
                </div>
                <div className='flex gap-4 '>
                    <button className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>Log In</button>
                    <button className='px-2 py-1 bg-blue-300 text-zinc-800 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>Sign Up</button>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default Navbar