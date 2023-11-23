"use client"

import React, {useState} from 'react'
import { RiMailLine,RiLockLine,RiEyeLine,RiEyeOffLine } from "react-icons/ri";
import Link from "next/link"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="bg-secondary-100 p-8 rounded-xl shadow-xl w-auto lg:w-[450px]">
      <h1 className="text-3xl text-center font-bold tracking-[3px] text-white mb-8">
        Login
      </h1>
      <form className='mb-7'>
          <button className='flex items-center justify-center gap-4 mb-8 bg-secondary-900 w-full py-3 px-4 rounded-xl text-gray-100'>
            <img src='https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png' className="w-4 h-4"/>
            Enter with Google
          </button>
          <div className='relative mb-3'>
            <RiMailLine className='absolute top-1/2 -translate-y-1/2 left-2 text-primary'/>
            <input type='email' className='py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg' placeholder='E-mail'/>
          </div>
          <div className='relative mb-4'>
            <RiLockLine className='absolute top-1/2 -translate-y-1/2 left-2 text-primary'/>
            <input type={showPassword ? "text" : "password"} className='py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg' placeholder='Password'/>
            {
              showPassword
              ? (<RiEyeOffLine onClick={()=>setShowPassword(!showPassword)} className='absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary'/>)
              : (<RiEyeLine onClick={()=>setShowPassword(!showPassword)} className='absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary'/>)
            }
          </div>
          <div>
            <button type='submit' className='bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors'>
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