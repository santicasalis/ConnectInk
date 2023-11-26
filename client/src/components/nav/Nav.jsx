"use client"
import Link from "next/link";
import React from "react";
import {RiArrowDownSLine} from "react-icons/ri";
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

export default function Nav() {
  return (
    <nav className="bg-secondary-900 py-5 px-8 text-white mb-[30px]">
      <ul className="flex justify-between gap-8">
        <div>
            <li>
              <Link href='/'>
                <span className="text-2xl">Connect<span className="text-primary">Ink<span className="text-3xl">!</span></span></span>
              </Link>
            </li>
        </div>
        <div className="flex items-center gap-x-8">
            <li>
              <Link href='/about'>
                  <span className="hover:text-primary">About</span>
              </Link>
            </li>
            <li>
              <Link href='/explore'>
                  <span className="hover:text-primary">Explore</span>
              </Link>
            </li>
            <li>
              <Link href="/auth">
                Ingresar
              </Link>
            </li>
            {/* <li>
                <Menu menuButton={<MenuButton className='flex items-center gap-x-2 hover:bg-secondary-100 py-2 px-4 rounded-lg'>
                    <Link href='/' className="flex items-center hover:text-primary">
                        <span > Ingresar Como</span>
                        <RiArrowDownSLine/>
                    </Link>
                  </MenuButton>}
                  menuStyle={{backgroundColor:'#252524', color:'white', padding:3, width:'250px'}}
                  transition
                  >
                    <MenuItem>
                        <Link href='/auth' className='flex flex-col  gap-2 text-sm py-1.5'>
                            
                            <span className="font-bold text-[16px]">Cliente</span>
                            <span className="text-[11px] text-gray-300">Conoce el trabajo de los artistas, contactalos y fija una fecha para tu proximo Tattoo</span>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href='' className='flex flex-col  gap-2 text-sm py-1.5'>
                            
                            <span  className="font-bold text-[16px]">Artista</span>
                            <span className="text-[11px] text-gray-300">Gestiona tu TattooShop, mostra tus trabajos, gana mas publico</span>
                        </Link>
                    </MenuItem>
                </Menu>  
            </li> */}
        </div>
      </ul>
    </nav>
  );
}
