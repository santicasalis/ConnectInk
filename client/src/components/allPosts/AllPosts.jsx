"use client"

import React from 'react'
import PostDashboard from '../postDashboard/PostDashboard'
import { useSelector } from 'react-redux'

const AllPosts = () => {
  const posts = useSelector((state) => state.posts)
  return (
    <div className='flex flex-col items-center w-full '>
      {posts?.publications.map((publication) => {
        return <PostDashboard publication={publication} image={user.image} name={user.name} lastName={user.lastName} />
      })}
    </div>
  )
}

export default AllPosts