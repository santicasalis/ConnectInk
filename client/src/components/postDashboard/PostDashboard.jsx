"use client"

import Link from 'next/link'
import React from 'react'
import { RiHeart3Line, RiHeart3Fill, RiEditFill, RiDeleteBin6Fill, RiMoreFill } from "react-icons/ri";
import { Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useState } from 'react';

const PostDashboard = () => {
    const [isLike, setIsLike] = useState(false);
    const handleClick = () => {
        setIsLike(!isLike);
    }
  return (
    <div className=' flex flex-col xl:w-[60%] bg-secondary-900 rounded-md overflow-hidden'>
        <div className='flex justify-between'>
            <div className='flex gap-x-2 p-2 items-center'>
                <img src='https://elcomercio.pe/resizer/Nk5gbJwG_w5n5tk9fd-Fu_RaJS8=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/UNWTCT67INFF7BCND5UVRFQYIQ.webp'
                    className='w-8 h-8 object-cover rounded-full'
                />
                <span className='text-[15px]'>Javier Milei</span>
            </div>
            <div className='p-2 flex items-center justify-center'>
                <Menu menuButton={
                    <MenuButton >  
                        <RiMoreFill className='text-white text-[25px] cursor-pointer'/>
                    </MenuButton>}
                transition
                menuClassName={'hover:bg-red text-red-500'}>
                    <MenuItem>
                        <Link href='' className='flex items-center gap-2 text-sm py-1.5'>
                            <RiEditFill />
                            Editar
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href='' className='flex items-center gap-2 text-sm py-1.5'>
                            <RiDeleteBin6Fill />
                            Eliminar
                        </Link>
                    </MenuItem>
                </Menu>
            </div>
        </div>
        <div className="w-[100%] aspect-w-16 aspect-h-9 mb-2">
            <img src="https://miro.medium.com/v2/resize:fit:1170/1*GJKF7lLHdqmr1rKpUmoqHw.jpeg" alt="" className="object-cover w-full h-full" />
        </div>
        <div onClick={handleClick} className='cursor-pointer text-[25px] flex gap-x-2'>
           {
                isLike
                ? <RiHeart3Fill className='text-red-500'/>
                : <RiHeart3Line />
           }

        </div>
    </div>
  )
}

export default PostDashboard