"use client"
import React from 'react'
import {RiNotification3Line,RiArrowDownSLine, RiSettings5Fill,RiLogoutCircleRLine, RiReplyLine} from "react-icons/ri";
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import Link from 'next/link'

const Header = () => {
  
  return (
    <header className='h-[8vh] md:h-[8vh] border-b border-gray-600 p-8 flex items-center justify-end'>
        <nav className='w-full flex items-center gap-x-4 justify-between'>
            <button className='flex items-center gap-x-1 hover:bg-secondary-100 rounded-lg p-2'>
                <RiReplyLine className=''/>
                Leave Dashboard
            </button>
            <div className='flex items-center gap-x-4'>
              <button className='relative hover:bg-secondary-100 p-2 rounded-lg transition-colors'>
                  <RiNotification3Line/>
                  <span className='absolute -top-0 -right-0 bg-red-600 py-0.5 px-1 text-white rounded-full text-[8px] font-bold'>
                      2
                  </span>
              </button>
              
              <Menu menuButton={<MenuButton className='flex items-center gap-x-2 hover:bg-secondary-100 py-2 px-4 rounded-lg'>
                <img src='https://elcomercio.pe/resizer/Nk5gbJwG_w5n5tk9fd-Fu_RaJS8=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/UNWTCT67INFF7BCND5UVRFQYIQ.webp'
                  className='w-6 h-6 object-cover rounded-full'
                  />
                  <span>
                      Javier Milei
                  </span>
                  <RiArrowDownSLine />
              </MenuButton>}
              menuStyle={{backgroundColor:'#252524', color:'white', padding:3}}
              transition
              >
                <MenuItem className="rounded-lg transition-colors border-b-2 border-gray-500/50">
                    <Link href='' className='flex items-center gap-x-4'>
                        <img src='https://elcomercio.pe/resizer/Nk5gbJwG_w5n5tk9fd-Fu_RaJS8=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/UNWTCT67INFF7BCND5UVRFQYIQ.webp'
                          className='w-7 h-7 object-cover rounded-full'
                        />
                        <div className='flex flex-col gap-1 text-sm'>
                          <span>Javier Milei</span>
                          <span className='text-[9px]'>javier@milei.com</span>
                        </div>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href='' className='flex items-center gap-2 text-sm py-1.5'>
                        <RiSettings5Fill />
                        Settings
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href='' className='flex items-center gap-2 text-sm py-1.5'>
                        <RiLogoutCircleRLine />
                        Logout
                    </Link>
                </MenuItem>
              </Menu>
            </div>
          
        </nav>
    </header>
  )
}

export default Header