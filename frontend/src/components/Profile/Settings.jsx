import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader';
import base_url from '../../store/url';


const Settings = () => {
  const [value,setValue]=useState({address:""});
  const [ProfileData,setProfileData]=useState()
const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`
}
const change=(e)=>{
  const {name,value}=e.target
  setValue({...value,[name]:value})
}
const submitAddress=async()=>{
  const res=await axios.put(`${base_url}/api/v1/update-address`,value,{headers})
  alert(res.data.message)
}
useEffect(()=>
{
  const fetch=async()=>{
    const response=await axios.get(
      `${base_url}/api/v1/get-user-information`,
      {headers}
    )
    setProfileData(response.data)
    
    setValue({address:response.data.address})
  }
  fetch()
},[])

  return (
    <>
    {!ProfileData &&
    <div className='w-full h-[100%] flex  items-center justify-center'><Loader/></div>
    }{" "}
    {ProfileData  && (
      <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Settings</h1>
        <div className='flex  gap-12'>
          <div className=''>
            <label htmlFor="">Username</label>
            <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.username}</p>
          </div>
          <div className=''>
            <label htmlFor="">Email</label>
            <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
              {ProfileData.email}
            </p>
          </div>
        </div>

          <div className='flex flex-col '>
            <label htmlFor="">Address</label>
            <textarea 
            className='p-2 rounded bg-zinc-800 mt-2 font-semibold' 
            rows="5"
            placeholder='Address'
            name='address'
            value={value.address}
            onChange={change}
           />
           
          </div>
          <div className='mt-4 flex justify-end'>
              <button onClick={submitAddress}
              className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400'>
                Update 
              </button>
          </div>
      </div>


    )}
    </>
  )
}

export default Settings