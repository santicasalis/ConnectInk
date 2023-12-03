 "use client"
import React, { useEffect , useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import PostCards from '@/components/postCards/PostCards'
import { getAllPosts } from '../redux/features/posts/postsActions'
import axios from "axios"
import { orderPosts } from '../utils/ordenarPosts'
import UserPostDash from "@/components/userPostDash/UserPostDash"

 function UDashboard () {
  const dispatch = useDispatch()
   const [ posts, setPosts] = useState([]) 
   
 // const user = useSelector((state) => state.user.logedInUser)

  useEffect (()=>{
    const fetchData = async ()=>{
      try {
        const artists =(await axios.get("http://localhost:3001/tattooArtists")).data
        let allPosts = [];

        artists.forEach((artist) => {
          if(artist?.publications?.length >0){
            artist.publications.forEach((publi)=>{
              publi["nameArtist"] = artist.fullName
              publi["profilePic"] = artist.image
              publi["artistId"] = artist.id
            })
          }

          allPosts = [...allPosts, ...artist.publications];
        });
        
        allPosts = orderPosts(allPosts)
        setPosts(allPosts);
        
      } catch (error) {
        console.error(error)
      }
   }
    
   fetchData()
     },[])

  return (
    <div className='bg-secondary-900 p-8 rounded-xl w-full'>
      <h1 className='text-4xl'> Incio </h1>
      <hr className='my-8 border-gray-500'/>
        <div className="flex flex-col items-center w-full ">
          
           { posts.map((post)=>{
             return < UserPostDash publication={post} />


           })}
            
           
        </div>
    </div>
  )
}

export default UDashboard