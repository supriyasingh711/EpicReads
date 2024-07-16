import React from 'react'
import { Link, resolvePath } from 'react-router-dom'
import axios from 'axios'
const BookCard = ({data,favourite}) => {
  const handleRemoveBook=async()=>{
  
      const headers={
        id: localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
        bookid:data._id
      }
    
    const response=await axios.put(
      "http://localhost:1000/api/v1/delete-from-favourite",{},
      {headers}
    )
    alert(response.data.message)
  }
  return (
    <>
    <Link to={`/view-book-details/${data._id}`}>
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
        <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.url} alt="" className='h-[25vh]' />
        </div>
        <h2 className='mt-4 text-xl '>{data.title}</h2>
        <p className='mt-2 text-zinc-400 font-semibold '>By {data.author}</p>
        <p className='mt-2 text-zinc-200 font-semibold '>$ {data.price}</p>
    </div>
    </Link>
    {favourite  && (
      <button className='bg-yellow-500 font-semibold px-4 py-2 rounded border-yellow-500  ' 
      onClick={handleRemoveBook}>Remove from Favourites</button>
      
    )}
    
    </>
  )
}

export default BookCard