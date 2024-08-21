import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import { Link } from 'react-router-dom'
import {FaCheck} from "react-icons/fa"
import { IoOpenOutline } from "react-icons/io5";
import UserDetails from './UserDetails'
import base_url from '../store/url'



const AllOrders = () => {
  const [userDiv,setuserDiv]=useState('hidden')
  const [userDivData,setuserDivData]=useState()
  const [AllOrders,setAllOrders]=useState()
  const [Options,setOptions]=useState(-1)
  const [Value,setValues]=useState({status:""})
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(()=>{
    const fetch=async()=>{

      const res=await axios.get(`${base_url}/api/v1/get-all-orders`,
        {headers});
  
        setAllOrders(res.data.data)
       

    }
    fetch()
  },[AllOrders])
  
const changeStatus=(e)=>{
  const {value}=e.target;
  setValues({status:value})
}
const submitChanges=async(i)=>{
  const id=AllOrders[i]._id;
  const res=await axios.put(`${base_url}/api/v1/update-order-status/${id}`,Value,{headers})
  alert(res.data.message)
}


const setOptionsButton=(i)=>{
      setOptions(i);
}

  return (
<>
      {!AllOrders && (
        <div className='h-[100%] flex items-center justify-center'><Loader/></div>
      ) }
      {AllOrders && AllOrders.length>0 &&  
      <>
     
      <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>All Orders</h1>
        <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2' >
          <div className='w-[3%]'>
            <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[40%] md:w-[22%]'>
            <h1 className='text-center'>Books</h1>
            </div>
            <div className='w-[45%] hidden md:block'>
            <h1 className='text-center'>Description</h1>
            </div>
            <div className='w-[9%]'>
            <h1 className='text-center'>Price</h1>
            </div>
            <div className='w-[25%] md:w-[16%]'>
            <h1 className='text-center'>Status</h1>
            </div>
            <div className='w-[5%] md:block'>
            <h1 className='text-center'>User </h1>
            </div>

        </div>
       {AllOrders && AllOrders.map((items,i)=>(
        <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer'>
          <div className='w-[3%]'>
            <h1 className='text-center'>{i+1}</h1>
          </div>
          <div className='w-[40%]'>
            <Link 
              to={`/view-book-details/${items.book._id}`}
              className="hover:text-blue-300"
             >{items.book.title}
            
            </Link>
            </div>
            <div className=' md:w-[45%] hidden md:block'>
              <h1 className=''>{items.book.description.slice(0,50)}...</h1>

            </div>

            <div className='w-[15%] md:w-[10%]'>
              <h1 className=''>${items.book.price}</h1>
            </div>
            <div className='w-[20%] md:w-[13%]'>
              <h1 className='font-semibold'> 
                <button 
                className='hover:scale-105 transition-all duration-300' 
                onClick={()=>setOptionsButton(i)}>
                  {items.status==="Order Placed"?(
                    <div className='text-yellow-500'>{items.status}</div>
                  ):items.status==="Cancelled"?(
                    <div className='text-red-500'>{items.status}</div>
                  ):(
                    <div className='text-green-500'>{items.status}</div>

                  )}
                </button>
                <div className={`${Options===i?"flex":"hidden"}`}>

                  <select 
                  name="status" 
                  id="" 
                  className='bg-gray-800'
                  onChange={changeStatus}
                  value={Value.status}
                  >
                    {[
                      "Order Placed",
                      "Out for Delivery",
                      "Delivered",
                      "Cancelled"
                    ].map((items,i)=>(
                        <option value={items} key={i}>{items}</option>
                    )
                    
                    )
                  }
                  </select>
                  <button 
                  className='text-green-500 hover:text-pink-600 mx-2'
                  onClick={()=>{
                    setOptions(-1);
                    submitChanges(i)
                  }}
                  ><FaCheck/></button>
                </div>
              </h1>

            </div>
            <div 
            className=''>
              <button 
              className='text-xl hover:text-orange-500'
              onClick={()=>{
                setuserDiv("fixed")
                setuserDivData(items.user)
              }}
              >
                  <IoOpenOutline />
              </button>

            </div>
          </div>

        
       ))}
      </div>
    
      </>
      
      }
      {
        userDivData && (
          <UserDetails userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />
        )
      }
</>

  )
}

export default AllOrders