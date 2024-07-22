
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader'; // Assuming you have a Loader component
import { FaHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import {MdOutlineDelete} from "react-icons/md"
import { useSelector } from 'react-redux';


const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
  const role=useSelector((state)=>state.auth.role)
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return 
    
    <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader /></div>
    
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id
  };
const setFavourite=async()=>{
  const response=await axios.put("http://localhost:1000/api/v1/add-to-favourite",
    {},
    {headers})
   alert(response.data.message)
}
const setCart=async()=>{
  const response=await axios.put("http://localhost:1000/api/v1/add-to-cart",
    {},
    {headers})
   alert(response.data.message)
}
const deletebook=async()=>{
  const res=await axios.delete("http://localhost:1000/api/v1/delete-book",{headers})
  alert(res.data.message)
  navigate("/books")
}



  return (
    <>
    <div className='px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'>
      <div className='flex flex-col lg:flex-row rounded p-4  md:h-[70vh] md:w-3/6 flex flex-col md:flex-row items-center justify-between gap-8'>
        <img src={data.url} className='md:h-[50vh] object-cover' alt="" />
      </div>
{isLoggedIn===true && role==="user" && <>
  <div className='flex md:flex-col gap-5 items-center justify-center'>
          <button className='bg-white rounded-full text-2xl p-2 mb-5' onClick={setFavourite}><FaHeart/></button>
          <button className='bg-white rounded-full text-2xl p-2 mb-5' onClick={setCart}><FaShoppingCart/></button>
        </div>
</>}
{isLoggedIn===true && role==="admin" && <>
  <div className='flex  items-center justify-center md:flex-col gap-5 '>
    <Link 
    to={`/update-book/${id}`}
    className='bg-white rounded-full text-2xl lg:text-3xl p-1 '
    >
      <FaEdit/>{" "}
      <span className='ms-4 block lg:hidden'></span>
    
    </Link>
          <button className='bg-white rounded-full text-2xl p-1 md:mb-5' onClick={deletebook}><MdOutlineDelete/></button>
          
        </div>
</>}
        
      <div className='p-4 md:w-3/6'>
        <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
        <p className='text-zinc-400 mt-1'>By {data.author}</p>
        <p className='text-zinc-500 mt-4 text-xl'>{data.description}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-400'>
        Available In:  {data.language}
        </p>
        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price: ${data.price}</p>
      </div>
    </div>
    </>
    
  );
};

export default ViewBookDetails;
