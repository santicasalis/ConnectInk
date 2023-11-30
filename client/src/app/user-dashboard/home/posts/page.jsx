"use client"

import { getAllArtists } from '@/app/redux/features/artists/artistActions'
import PostsDashboard from '@/components/postsDashboard/PostsDashboard'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserId } from '@/app/redux/features/user/userActions'
import AllPosts from '@/components/allPosts/AllPosts'


const MyPosts = () => {
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user)
  useEffect(()=>{
  dispatch(getAllArtists())
  dispatch(getUserId(user.email))
},[])

  return (
    <div>
        <AllPosts />
    </div>
  )
}

export default MyPosts