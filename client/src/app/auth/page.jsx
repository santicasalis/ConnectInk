"use client"

import React, {useState} from 'react'
import { RiMailLine,RiLockLine,RiEyeLine,RiEyeOffLine } from "react-icons/ri";
import Link from "next/link"
import {useRouter} from "next/navigation"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../redux/features/user/userActions';

const Login = () => {
  const artists = useSelector((state) => state.artists.people)
  const dispatch = useDispatch()
  const email = 'prueba.prueba@gmail.com'
  const password = 'prueba123456'
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name] : event.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const found = artists.map((artist) => {
      if(artist.email == data.email){
        dispatch(getUserId(data.email))
        return true
      }
      return false
    })

    found && router.replace("/home");
    // if(data.email == email && data.password == password){
    //   toast.success('You logged in correctly', {
    //     className:'toastSuccess',
    //     position: toast.POSITION.BOTTOM_RIGHT,
    //     autoClose: 3000,
    //     hideProgressBar: true,
    //   });
    !found && toast.error("You couldn't log in", {
      className:'toastError',
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
    });
  }
  return (
    <div className="bg-secondary-100 p-8 rounded-xl shadow-xl w-auto lg:w-[450px]">
      <h1 className="text-3xl text-center font-bold tracking-[3px] text-white mb-8">
        Login
      </h1>
      <form onSubmit={handleSubmit} className='mb-7'>
          <button className='flex items-center justify-center gap-4 mb-8 bg-secondary-900 w-full py-3 px-4 rounded-xl text-gray-100'>
            <img src='https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png' className="w-4 h-4"/>
            Enter with Google
          </button>
          <div className='relative mb-3'>
            <RiMailLine className='absolute top-1/2 -translate-y-1/2 left-2 text-primary'/>
            <input type='email' name='email' onChange={handleChange} className='py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg' placeholder='E-mail'/>
          </div>
          <div className='relative mb-4'>
            <RiLockLine className='absolute top-1/2 -translate-y-1/2 left-2 text-primary'/>
            <input type={showPassword ? "text" : "password"} name='password' onChange={handleChange} className='py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg' placeholder='Password'/>
            {
              showPassword
              ? (<RiEyeOffLine onClick={()=>setShowPassword(!showPassword)} className='absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary'/>)
              : (<RiEyeLine onClick={()=>setShowPassword(!showPassword)} className='absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary'/>)
            }
          </div>
          <div>
            <button type='submit'className='bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors'>
              Login
            </button>
          </div>
      </form>
      <div className='flex flex-col gap-3 items-center'>
          <Link href='/auth/forgot-password' className='text-gray-200 hover:text-primary transition-colors'>Did you forget your password?</Link>
          <span className='flex items-center gap-2'>
              You do not have an account <Link href='/auth/register' className='text-primary hover:text-gray-100 transition-colors'>Register</Link> 
          </span>   
      </div>
    </div>
  )
}

export default Login