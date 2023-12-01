"use client"
import React, { useEffect , useState} from 'react'
import {RiEdit2Line} from "react-icons/ri"
import { useSelector,useDispatch } from 'react-redux'
import PostCards from '@/components/postCards/PostCards'
import { getAllPosts } from '../redux/features/posts/postsActions'

const UDashboard = () => {
  const dispatch = useDispatch()
  

  const[loading, setLoading]= useState(true)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])
  
  const posts = useSelector((state)=>state.posts)
  console.log(posts, "METENESCANSADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")



  return (
    <div className='bg-secondary-900 p-8 rounded-xl w-full'>
      <h1 className='text-4xl'> Incio </h1>
      <hr className='my-8 border-gray-500'/>
        <div>
          { posts &&
            posts?.map((post) => (
              // <PostCards
              //   key={post.id}
              //   id={post.id}
              //   fullName={post.fullName}
              //   image={post.image}
              //   description={post.description}
              // />
              <p> HOLA </p>
            ))
            
            }
          
        </div>
    </div>
  )
}

export default UDashboard