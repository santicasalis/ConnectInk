"use client"

import Link from 'next/link'
import React from 'react'
import { RiHeart3Line, RiHeart3Fill, RiEditFill, RiDeleteBin6Fill, RiMoreFill, RiMessage3Line, RiEmotionHappyLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { openModalAction } from '../../app/redux/features/modalEdit/modalEditAction';
import { openModalDeleteAction } from '../../app/redux/features/modalDelete/modalDeleteAction';

const AdminPostDashboard = ({publication, name, image}) => {
    const [isLike, setIsLike] = useState(false);
    const [textCommend, setTextCommend] = useState('');

    const dispatch = useDispatch();

    const removeAboutAgo = (distance) => {
        return distance.replace(/(?:about|ago)/gi, '').trim();
      };
    
      const formatDistance = (date) => {
        const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
        const cleanedDistance = removeAboutAgo(distance);
        return cleanedDistance;
      };

    const handleClick = () => {
        setIsLike(!isLike);
    }

    const handleChange = (event) => {
        setTextCommend(event.target.value);
    }


    const imageLoader = ({src}) => {
        return src
    }
    return (
        <div className=' flex flex-col xl:w-[60%] border-transparent pb-3 border-[2px] border-b-admin/40 bg-secondary-900 rounded-md overflow-hidden m-5 ' >
            <div>
                <div className='flex justify-between'>
                    <div className='flex gap-x-2 p-2 items-center'>
                        <div className='rounded-full w-[32px] h-[32px] overflow-hidden'>
                            <Image unoptimized loader={imageLoader} src={image} height={32} width={32} alt={name} style={{width:'100%', height:'100%' }}/>
                        </div>
                        <span className='text-[15px] text-artistfont'>{`${name}`}</span>
                        <p className='text-artistfont/60 text-[13px]'>• {formatDistance(publication.createdAt)}</p>
                    </div>
                    <div className='p-2 flex items-center justify-center'>
                        <Menu menuButton={
                            <MenuButton >  
                                <RiMoreFill className='text-artistfont text-[25px] cursor-pointer'/>
                            </MenuButton>}
                        transition
                        menuStyle={{backgroundColor:'#252524', color:'white'}}
                        menuClassName={'hover:bg-secondary-900 hover:text-black-900'}>
                            <MenuItem className='hover:bg-secondary-100 w-full h-full text-artistfont' onClick={()=> dispatch(openModalAction(publication)) }>
                                <div>
                                    <Link href='' className='flex items-center gap-2 text-sm py-1.5'>
                                        <RiEditFill />
                                        Editar
                                    </Link>
                                </div>
                                
                            </MenuItem>
                            <MenuItem className='hover:bg-secondary-100 w-full h-full text-artistfont' onClick={() => dispatch(openModalDeleteAction(publication))}>
                                <Link href='' className='flex items-center gap-2 text-sm py-1.5'>
                                    <RiDeleteBin6Fill />
                                    Eliminar
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center bg-secondary-100 mb-2 max-h-[500px] ">
                    <Image unoptimized src={publication.image} loader={imageLoader} height={500} width={1000} className='object-cover max-h-[500px] ' alt={publication.description} />
                </div>
                <div  className='cursor-pointer text-[30px] flex gap-x-2 mb-2'>
                {
                        isLike
                        ? <RiHeart3Fill onClick={handleClick} className='text-red-500 '/>
                        : <RiHeart3Line onClick={handleClick} className='text-artistfont'/>
                }
                    <RiMessage3Line className='text-artistfont'/>
                </div>
                <div className='flex flex-col'>
                    <p className='mb-1 text-artistfont'>Les gusta a 218 personas</p>
                    <p className='mb-1 text-artistfont'><span className='font-bold text-artistfont text-[16px] mr-2'>{name}</span>{publication?.description}</p>
                    <p className='text-artistfont/60 cursor-pointer mb-1'>Ver comentarios</p>
                    <form className='m-0 p-0'>
                        <div className='flex justify-between gap-x-3'>
                            <textarea type='text' onChange={handleChange} value={textCommend} placeholder='Añadir comentario...' rows={2} className='flex-1 py-0 h-auto resize-none text-[16px]  outline-none bg-transparent text-artistfont '/>
                            <div className='flex gap-x-2  w-[100px] text-artistfont'>
                                <button type='submit' className={`flex items-start pt-0.5 ${textCommend.length==0 && 'hidden'} `}>
                                    <span className='text-red-600 text-[17px] hover:text-white'>Publicar</span>
                                </button>
                                <div className='pt-1 ml-auto'>
                                    <RiEmotionHappyLine className='cursor-pointer top-0 text-[17px] text-artistfont'/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>  
        </div>
  )
}

export default AdminPostDashboard