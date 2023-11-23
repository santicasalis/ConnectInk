import React from 'react'
import { RiMailLine } from "react-icons/ri";
import Link from "next/link"

const ForgetPassword = () => {
  return (
    <div className="bg-secondary-100 p-8 rounded-xl shadow-xl w-auto lg:w-[450px]">
      <h1 className="text-3xl text-center font-bold tracking-[3px] text-white mb-8">
        Recover your password
      </h1>
      <form className='mb-7'>
          <div className='relative mb-8'>
            <RiMailLine className='absolute top-1/2 -translate-y-1/2 left-2 text-primary'/>
            <input type='email' className='py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg' placeholder='Enter your email'/>
          </div>
          <div>
            <button type='submit' className='bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors'>
              Send Instructions
            </button>
          </div>
      </form>
      <div className='flex flex-col gap-3 items-center'>
          <span className='flex items-center gap-2'>
              You already have an account <Link href='/auth' className='text-primary hover:text-gray-100 transition-colors'>Login</Link> 
          </span>  
          <span className='flex items-center gap-2'>
              You do not have an account <Link href='/auth/register' className='text-primary hover:text-gray-100 transition-colors'>Register</Link> 
          </span>   
      </div>
    </div>
  )
}

export default ForgetPassword