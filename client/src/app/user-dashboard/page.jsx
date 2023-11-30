"use client"
import React from 'react'
import {RiEdit2Line} from "react-icons/ri"
import { useSelector } from 'react-redux'

import AllPosts from '@/components/allPosts/AllPosts'
// import { useEffect } from 'react'
// import { getAllPosts } from '../redux/features/posts/postsActions'

const UserDashboard = () => {
  
  const posts = useSelector((state)=> state.posts)

  // useEffect(() => {
  //  dispatch(getAllPosts());
  // }, []);

  return (
    <div className='bg-secondary-900 p-8 rounded-xl w-full'>
      <h1 className='text-4xl'> Home</h1>
        <AllPosts/>
      <hr className='my-8 border-gray-500'/>
    </div>
  )
}

export default UserDashboard