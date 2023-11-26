"use client"

import Link from 'next/link'
import React from 'react'
import { RiHeart3Line, RiHeart3Fill, RiEditFill, RiDeleteBin6Fill, RiMoreFill, RiMessage3Line } from "react-icons/ri";
import { Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const PostDashboard = ({publication, name, lastName, image}) => {
    const [isLike, setIsLike] = useState(false);
    const handleClick = () => {
        setIsLike(!isLike);
    }

    const imageLoader = ({src}) => {
        return src
    }
    return (
    <div className=' flex flex-col xl:w-[60%] bg-secondary-900 rounded-md overflow-hidden m-5'>
        <div>
            <div className='flex justify-between'>
                <div className='flex gap-x-2 p-2 items-center'>
                    <Image loader={imageLoader} src={image} height={32} width={32} alt={name}/>
                    <span className='text-[15px]'>{`${name} ${lastName}`}</span>
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
                <Image src={publication.image} loader={imageLoader} width={500} height={500} alt={publication.description} />
            </div>
            <div onClick={handleClick} className='cursor-pointer text-[25px] flex gap-x-2'>
            {
                    isLike
                    ? <RiHeart3Fill className='text-red-500'/>
                    : <RiHeart3Line />
            }

            </div>
        </div>
        
    </div>
  )
}

export default PostDashboard