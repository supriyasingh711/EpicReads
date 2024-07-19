import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'

const AllOrders = () => {
  const [AllOrders,setAllOrders]=useState()
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(()=>{
    const fetch=async()=>{
      const res=await axios.get("http://localhost:1000/get-all-orders",
        {headers});
        // console.log(res);

    }
    fetch()
  },[])

  return (
<>
      {!AllOrders && (
        <div className='flex items-center justify-center'><Loader/></div>
      ) }
      {AllOrders && (
        <div></div>
      )}
</>

  )
}

export default AllOrders