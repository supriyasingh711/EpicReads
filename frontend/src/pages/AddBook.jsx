import React, { useState } from 'react'
import axios from 'axios'



const AddBook = () => {
    const [Data,setData]=useState({
        url:"",
        title:"",
        author:"",
        price:"",
        description:"",
        language:"",
    })
    const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,

    }
    const change=(e)=>{
        const {name,value}=e.target;
        setData({...Data,[name]:value})
    }
    const submit=async()=>{
        try {
           if(Data.url===""|| Data.title==="" || Data.author==="" || Data.price==="" || Data.desc==="" || Data.language==="" ){
            alert("All fields are required");
           } else{
            const response=await axios.post(
                "http://localhost:1000/api/v1/add-book",Data,{headers}
            )
            setData({
                url:"",
                title:"",
                author:"",
                price:"",
                description:"",
                language:""

            })
            alert(response.data.message)
           }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
  return (
    <>
    <div className='h-[100%] p-0 md:p-4'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Add book</h1>
        <div className='p-4 bg-zinc-800 rounded'>
            <div >
                <label htmlFor="" className='text-zinc-400'>Image URL</label>
                <input 
                type="text" 
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='url of image'
                required
                value={Data.url}
                onChange={change}
                name="url" id="url" />
            </div>
            <div >
                <label htmlFor="" className='text-zinc-400'>Title</label>
                <input 
                type="text" 
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='title'
                required
                value={Data.title}
                onChange={change}
                name="title" id="title" />
            </div><div >
                <label htmlFor="" className='text-zinc-400'>Author</label>
                <input 
                type="text" 
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='Author of the book'
                required
                value={Data.author}
                onChange={change}
                name="author" id="author" />
            </div><div >
                <label htmlFor="" className='text-zinc-400'>Price</label>
                <input 
                type="number" 
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='price'
                required
                value={Data.price}
                onChange={change}
                name="price" id="price" />
            </div><div >
                <label htmlFor="" className='text-zinc-400'>Description</label>
                <input 
                type="text" 
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='Write in Brief about the book.'
                required
                value={Data.description}
                onChange={change}
                name="description" id="description" />
            </div><div >
                <label htmlFor="" className='text-zinc-400'>Language</label>
                <input 
                type="text" 
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='English/Hindi/Bengali'
                required
                value={Data.language}
                onChange={change}
                name="language" id="language" />
            </div>
        </div>

        <div className='mt-2 flex items-center justify-center'>


        <button onClick={submit} className='p-4 text-white-800 bg-blue-900 hover:bg-white hover:text-zinc-800 transition-all  '>Add Book</button>

        </div>
    </div>
    </>
  )
}

export default AddBook