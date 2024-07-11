import React,{useState,useEffect} from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import axios from "axios"

const Books = () => {
  const [Data,setData]=useState()
    useEffect(()=>{
        const fetch=async()=>{
            const response=await axios.get("http://localhost:1000/api/v1/get-all-books");
            setData(response.data.data);
        }
        fetch()
    },[])
  return (
    <>
    <h4 className='text-3xl p-4 text-black'>Our Collections</h4>
        {!Data && 
        <div className='flex items-center justify-center my-8'><Loader/></div>
        }
        
        <div className='my-4 grid grid-cols-1 md:grid-cols-4 gap-4'>
            {Data &&Data.map((items,i)=>

                <div key={i}><BookCard data={items}/></div>
            )}
        </div>
    </>
  )
}

export default Books