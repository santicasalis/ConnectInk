import React from 'react'
import ArtistPost from '../../../components/artistPost/artistPost'

const TattooGallery = () => {
  return (
    <div className='w-full flex flex-col items-center'>
        <h1 className='text-4xl'> Create Tattoo</h1>
        <div className='mt-2 w-[90%] bg-secondary-100 flex items-center col-span-5'>
        <ArtistPost />
        </div>
        
    </div>
  )
}

export default TattooGallery