"use client"
import React, { useEffect, useState } from 'react'
import {RiEdit2Line} from "react-icons/ri"
import { useSelector,useDispatch } from 'react-redux'
import { getAllPosts } from '../redux/features/posts/postsActions'
import AllPosts from '@/components/allPosts/AllPosts'
//import PostCard from '@/components/postsCard/AdminCard'


const UserDashboard = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state)=> state.posts)
  const [publications, setPublications]= useState([])

  console.log(posts,  "MOSTRATELAREPUITOSIMAMADREQWUETEPARIO")
  console.log(publications, "LCDTGHHHHHHHHHHHHHH")
  
  useEffect(()=>{
    dispatch(getAllPosts())
  },[])

  useEffect(()=>{
    setPublications(posts)
  },[posts])

  return (
    <div className='bg-secondary-900 p-8 rounded-xl w-full'>
      <h1 className='text-4xl'> Inicio</h1>
   
     {publications.length > 0 ? (
        publications.map((publication) => (
          <p>{publication.description}</p>
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
      <div className='flex flex-col items-center w-full '></div>
       
      <hr className='my-8 border-gray-500'/>
    </div>
  )
}

export default UserDashboard