import React, { useState } from 'react'
import logo from "../../assets/open-book.png"
import { Link } from 'react-router-dom'
import {FaGripLines} from "react-icons/fa"
import { useSelector } from 'react-redux'

const Navbar = () => {
    const links=[
        {
            title:"Home",
            link:"/"
        },
        
        {
            title:"Books",
            link:"/books"
        },
        {
            title:"About Us",
            link:"/about-us"
        },
        {
            title:"Cart",
            link:"/cart"
        },
        {
            title:"Profile",
            link:"/profile"
        },
        {
            title:"Admin",
            link:"/profile"
        },
    ]
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
    const role=useSelector((state)=>state.auth.role)
    if(isLoggedIn===false){
        links.splice(2,3)
    }
    if(isLoggedIn===true && role==="user"){
        links.splice(5,1)
    }
    if(isLoggedIn===true && role==="admin"){
        links.splice(4,1)
    }
const [SmallScreenNav,setSmallScreenNav]=useState("hidden")

  return (
    <>
     <nav className='z-50 relative bg-zinc-800 text-white px-4 py-8 flex items-center justify-between'>
        <div className='flex items-center '>
            <img 
            className='h-10 me-4'
            src={logo} alt="logo" />
            <h1 className='text-2xl font-semibold'>EpicReads</h1>
        </div>
        <div>

            <div className='nav-link-epicreads block md:flex items-center gap-4'>
                <div className=' hidden md:flex gap-4'>
                {links.map((items,i)=>
                (

                    <div className='flex items-center'>
                        {
                            items.title==="Profile" || items.title==="Admin" ?(
                <Link 
                to={items.link} 
                className='py-4 px-1 border border-blue-500 rounded hover:bg-white  hover:text-zinc-900 transition-all duration-300' 
                key={i}>{items.title}</Link>
                
                            ):(
                                <Link 
                to={items.link} 
                className='hover:text-blue-50 transition-all duration-300' 
                key={i}>{items.title}</Link>
                )}
                            
                        
                    </div>))
}
                </div>
        
                <div className='hidden md:flex gap-4 '>
                    {isLoggedIn===false && 
                    (
                        <>
                        <Link className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' to={"/log-in"}>Log In</Link>
                        <Link className='px-2 py-1 bg-blue-300 text-zinc-800 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' to={"/sign-up"}>Sign Up</Link>
                        </>
                    )
                    
                    }
                </div>
               <button className=' block md:hidden text-white text-2xl hover:text-zinc-400 ' 
               onClick={()=>{
                SmallScreenNav==="hidden"?setSmallScreenNav("block"):setSmallScreenNav("hidden");
                }}>
                <FaGripLines/>
               </button>
            </div>
        </div>
    </nav>
    <div className={`${SmallScreenNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
  
                {links.map((items,i)=>
                <Link 
                to={items.link} 
                className='text-white text-3xl mb-5 hover:text-blue-50 transition-all duration-300' 
                key={i}
                onClick={()=>{
                    SmallScreenNav==="hidden"?setSmallScreenNav("block"):setSmallScreenNav("hidden");
                    }}
                >{items.title}
              
                </Link>
                )}
            
                   {isLoggedIn===false && (
                    <>
                     <Link className='px-4 py-1 mb-8 text-2xl border border-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' to={"/log-in"}>Log In</Link>
                     <Link className='px-2 py-1 mb-8 text-2xl bg-blue-300 text-zinc-800 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' to={"/sign-up"}>Sign Up</Link>
                    </>
                   )}
                </div>
    </>
   
  )
}

export default Navbar