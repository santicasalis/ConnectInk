"use client"

import React from 'react'
import {RiEdit2Line} from "react-icons/ri"
import { useSelector } from 'react-redux'
import Image from 'next/image'
import {   RiMailLine,  RiLockLine,  RiEyeLine,  RiEyeOffLine,} from "react-icons/ri";
import { useState } from 'react'

const Profile = () => {
  const user = useSelector((state) => state.user)
  const [showPassword, setShowPassword] = useState(false);
  const imageLoader = ({src}) => {
    return src
  }
  return (
    <div className='bg-secondary-100 p-8 rounded-xl w-full'>
      <h1 className='text-4xl'> Mi perfil</h1>
      <hr className='my-8 border-gray-500'/>
      <form>
        <div className='flex items-center mb-6'>
          <div className='w-1/4'>
              <p >Foto de Pefil:</p>
          </div>
          <div className='flex-1'>
              <div className='relative mb-2'>
                  <Image src={user.image} loader={imageLoader} width={80} height={80} alt={`${user.Fullname} profile pic`} />
                  <label htmlFor='avatar' className='absolute bg-secondary-900 p-2 left-24 -top-2 rounded-full cursor-pointer hover:bg-secondary-100'>
                      <RiEdit2Line />
                  </label>
                  <input type='file' id='avatar' className='hidden'/>
              </div>
              <p className='text-gray-500 text-sm'>
                  Extensiones permitidas: png, jpg, jpeg
              </p>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <div className='w-1/4'>
              <p >Nombre Completo: <span className='text-red-500'>*</span></p>
          </div>
          <div className='flex-1 flex items-center gap-4'>
              <div className='w-1/2'>
                <input type="text" value={user.FullName} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
              </div>
              
          </div>
        </div>
        
        <div className='flex items-center mb-4'>
          <div className='w-1/4'>
              <p>Telefono: <span className='text-red-500'>*</span></p>
          </div>
          <div className='flex-1 flex items-center gap-4'>
              <div className='w-1/2'>
                <input type="text" value={user.phone} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
              </div>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <div className='w-1/4'>
              <p>Email: <span className='text-red-500'>*</span></p>
          </div>
          <div className='flex-1 flex items-center gap-4'>
              <div className='w-1/2'>
                <input type="text" value={user.email} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
              </div>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <div className='w-1/4'>
              <p>Constraseña: <span className='text-red-500'>*</span></p>
          </div>
          <div className='flex-1 flex items-center gap-4'>
              <div className='w-1/2 relative'>
                <input type={showPassword ? "text" : "password"} value={user.password} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
                {showPassword ? (
            <RiEyeOffLine
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
            />
          ) : (
            <RiEyeLine
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
            />
          )}
              </div>
          </div>
        </div>  
        
      </form>
    </div>
  )
}

export default Profile