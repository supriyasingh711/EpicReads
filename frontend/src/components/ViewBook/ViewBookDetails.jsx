
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader'; // Assuming you have a Loader component

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
    <div className='px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'>
      <div className='bg-zinc-800 rounded p-4  md:h-[88vh] md:w-3/6 flex flex-col md:flex-row items-center justify-center'>
        <img src={data.url} className='md:h-[50vh]' alt="" />
      </div>
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
