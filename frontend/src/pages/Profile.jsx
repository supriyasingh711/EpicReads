import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'

const Profile = () => {
  // const isLoggedIn=useSelector();
  const [Profile,setProfile]=useState()
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
      const fetch=async()=>{
          const response=await axios.get("http://localhost:1000/api/v1/get-user-information",{headers})
      console.log(response)
      setProfile(response.data)

      }
      fetch()
  },[])
  return (
<>
<div className='bg-zinc-900 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white '>
<>
{!Profile && 
<div className='w-full h-[100%] flex items-center justify-center'>
  <Loader/>
  </div>}
{Profile && <>
  <div className=' w-full md:w-2/6 h-screen'><Sidebar data={Profile}/></div>
  <div className='w-full md:w-4/6'><Outlet/></div>
</>}

</>

</div>
</>  )
}

export default Profile