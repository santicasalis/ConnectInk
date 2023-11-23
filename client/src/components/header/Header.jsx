import React from 'react'
import Nav from '../nav/Nav'

const Header = () => {
  return (
    <header className='h-[8vh] md:h-[8vh] border-b border-gray-600 grid grid-cols-5'>
        <div className='col-span-3'>
            <Nav />
        </div>
        <div className='p-8'>
            Header
        </div>
    </header>
  )
}

export default Header