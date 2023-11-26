"use client"

import Link from 'next/link'
import Nav from '@/components/nav/Nav'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllStyles } from './redux/features/styles/stylesActions'
import { getAllArtists } from './redux/features/artists/artistActions'

export default function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllStyles())
      dispatch(getAllArtists())
  }, [])
  return (
    <div className='flex flex-col h-scren'>
      <Nav/>
        <div style={{  textAlign: "center", color: "#fff", width: "100%" }}>
          <h1 style={{ fontSize: "4rem", margin: 0 }}>The best tattoos and artists?</h1>
          <p className='text-primary mb-10'>ConnectInk is the place</p>
          <div className='bg-gray-400 w-full md:h-[auto] xl:h-[700px]  overflow-hidden relative shadow-xl'>
              <img className='w-full' src='https://images3.alphacoders.com/866/866852.jpg'/>
              <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%" }}>
          <button className='bg-black opacity-70 hover:bg-secondary-900 text-white font-bold' style={{ padding: "15px 30px", fontSize: "1.5rem", color: "#fff", border: "2px solid white", borderRadius: "20px", cursor: "pointer" }}>
              Comenzar
          </button>
        </div>
      </div>
  )
}
