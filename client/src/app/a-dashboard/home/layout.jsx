'use client'

import TopBarOptions from "../../../components/topBarOptions/TopBarOptions";
import { RiAddFill } from "react-icons/ri";
import Link from 'next/link'
import { openModalCreateAction } from "../../../app/redux/features/modalCreate/modalCreateAction";
import { useDispatch } from "react-redux";


export default function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openModalCreateAction());
  }
    return (
      <div className='bg-secondary-900 p-8 rounded-xl w-full shadow-artist/70 shadow-lg'>
          <div className="flex justify-between ">
              <h1 className='text-4xl font-rocksalt text-artistfont/80'>Inicio</h1>
              <span onClick={handleClick} className="hover:bg-artist font-rocksalt  flex items-center justify-center gap-1 border-artist text-artistfont border-[1px] px-2 py-3 rounded-md cursor-pointer">
                  <RiAddFill className="font-bold "/>
                  Crear Publicacion
              </span>
          </div>
         
          <hr className='my-8 border-artist/40'/>
          {children}
      </div>    
    )
  }