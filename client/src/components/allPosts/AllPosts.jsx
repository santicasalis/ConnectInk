'use client'

import React, { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsAction } from '@/app/redux/features/posts/PostsActions';
import PostDashboard from '../postDashboard/PostDashboard';

const AllPosts = () => {
    const posts = useSelector((state) => state.posts);
    const user = useSelector((state) => state.user)
    
  return (
    <div>
       {
          posts.map((post)=>{
              return <PostDashboard publicacion={post} image={user.image} fullName={user.fullName} />
          }) 
       }
    </div>
  )
}

export default AllPosts