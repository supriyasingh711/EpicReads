import React, { useEffect, useState } from 'react'
import axios from "axios"
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'

const RecentlyAdded = () => {
    const [Data,setData]=useState()
    useEffect(()=>{
        const fetch=async()=>{
            const response=await axios.get("http://localhost:1000/api/v1/get-recent-books");
            setData(response.data.data);
        }
        fetch()
    },[])

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
        <h4 className='text-3xl p-4 text-yellow-100'>Recently Added Books</h4>
        {!Data && 
        <div className='flex items-center justify-center my-8'><Loader/></div>
        }
        
        <div className='my-4 grid grid-cols-1 md:grid-cols-4 gap-4'>
            {Data &&Data.map((items,i)=>

                <div key={i}><BookCard data={items}/></div>
            )}
        </div>
        </div>
  )
}

export default RecentlyAdded