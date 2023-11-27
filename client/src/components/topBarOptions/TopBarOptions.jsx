import React from 'react'
import Link from 'next/link'

const TopBarOptions = () => {
  return (
    <div className='  bg-secondary-900 rounded-lg mb-8 '>
        <nav className="flex gap-x-5 items-center">
            <Link href='/a-dashboard/home'>
                <span className="px-2 py-2 hover:text-primary rounded-lg text-[16px] font-bold text-gray-300">
                    Inicio
                </span>
            </Link >
            <Link href='/a-dashboard/home/mispublicaciones'>
                <span className=" px-2 py-2  hover:text-primary rounded-lg text-[16px] font-bold  text-gray-300">
                    Mis Publicaciones
                </span>
            </Link>
        </nav>
    </div>
  )
}

export default TopBarOptions