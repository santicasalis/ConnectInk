"use client"

import React from 'react'
import PostDashboard from '../postDashboard/PostDashboard'
import { useSelector } from 'react-redux'

const PostsDashboard = () => {
  const user = useSelector((state) => state.user)
  return (
    <div className='flex flex-col items-center w-full '>
      {user.publications.map((publication) => {
        return <PostDashboard publication={publication} image={user.image} name={user.name} lastName={user.lastName} />
      })}
    </div>
  )
}

export default PostsDashboard