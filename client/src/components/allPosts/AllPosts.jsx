"use client"

import React from 'react'
import PostDashboard from '../postDashboard/PostDashboard'
import { useSelector } from 'react-redux'
import PostCard from '../postsCard/AdminCard'


const AllPosts = () => {
  const posts = useSelector((state) => state.posts)

  return (
    <div className='flex flex-col items-center w-full '>
      {posts?.map((publication) => {
        return <PostCard publication={publication} image={user.image} name={user.fullName} />
      })}
    </div>
  )
}

export default AllPosts