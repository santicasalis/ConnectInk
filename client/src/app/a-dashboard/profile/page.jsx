import React from 'react'
import {RiEdit2Line} from "react-icons/ri"

const Profile = () => {
  const artistData = {
    name:'Javier',
    lastName:'Milei',
    email:'gatito_mimoso@gmail.com',
    password:'123456',
    phone:'5491164216546',
    address:'AAA, Av. Maipú 2001, B1636 Olivos, Provincia de Buenos Aires',
    location:'Argentina',
    shopName:'Tattoos La casta'
  };
  return (
    <div className='bg-secondary-100 p-8 rounded-xl w-full'>
      <h1 className='text-4xl'> My Profile</h1>
      <hr className='my-8 border-gray-500'/>
      <form>
        <div className='flex items-center mb-6'>
          <div className='w-1/4'>
              <p >Foto de Pefil:</p>
          </div>
          <div className='flex-1'>
              <div className='relative mb-2'>
                  <img className='w-28 h-28 object-cover rounded-lg' src='https://elcomercio.pe/resizer/Nk5gbJwG_w5n5tk9fd-Fu_RaJS8=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/UNWTCT67INFF7BCND5UVRFQYIQ.webp' />
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
              <p >Nombres Completos: <span className='text-red-500'>*</span></p>
          </div>
          <div className='flex-1 flex items-center gap-4'>
              <div className='w-full'>
                <input type="text" value={artistData.name} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
              </div>
              <div className='w-full'>
                <input type="text" value={artistData.lastName} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
              </div>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <div className='w-1/4'>
              <p>Email: <span className='text-red-500'>*</span></p>
          </div>
          <div className='flex-1 flex items-center gap-4'>
              <div className='w-full'>
                <input type="text" value={artistData.email} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
              </div>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <div className='w-1/4'>
              <p>Phone: <span className='text-red-500'>*</span></p>
          </div>
          <div className='flex-1 flex items-center gap-4'>
              <div className='w-full'>
                <input type="text" value={artistData.phone} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
              </div>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <div className='w-1/4'>
              <p>Address: <span className='text-red-500'>*</span></p>
          </div>
          <div className='flex-1 flex items-center gap-4'>
              <div className='w-full'>
                <input type="text" value={artistData.address} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
              </div>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <div className='w-1/4'>
              <p>Location: <span className='text-red-500'>*</span></p>
          </div>
          <div className='flex-1 flex items-center gap-4'>
              <div className='w-full'>
                <input type="text" value={artistData.location} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
              </div>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <div className='w-1/4'>
              <p>Shop Name: <span className='text-red-500'>*</span></p>
          </div>
          <div className='flex-1 flex items-center gap-4'>
              <div className='w-full'>
                <input type="text" value={artistData.shopName} className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default' readOnly/>
              </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile