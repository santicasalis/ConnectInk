"use client"
import React from 'react'
import {RiEdit2Line} from "react-icons/ri"
import { useSelector } from 'react-redux'

const UserDashboard = () => {
  
  const posts = useSelector((state)=> state.posts)

 

  return (
    <div className='bg-secondary-900 p-8 rounded-xl w-full'>
      <h1 className='text-4xl'> Home</h1>
      {/* {
        posts.map((post)=>{
          return  <PostsDashboard post={post} />
        })
      } */}
      <hr className='my-8 border-gray-500'/>
    </div>
  )
}

export default UserDashboard