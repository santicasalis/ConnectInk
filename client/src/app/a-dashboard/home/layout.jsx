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
              <span onClick={handleClick} className="hover:bg-artist/60 hover:border-artist/60 text-[17px] hover:text-artistfont flex items-center gap-1 border-artist/75 text-artist/75 border-[2px] px-2 py-3 rounded-md cursor-pointer">
                  <RiAddFill className="font-bold "/>
                  Crear Publicacion
              </span>
          </div>
         
          <hr className='my-8 border-artist/40'/>
          {children}
      </div>    
    )
  }