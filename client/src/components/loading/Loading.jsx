import React from 'react'

const Loading = () => {
  return (
    <div className='w-full min-h-screen flex relative ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
        <img className='w-[200px] h-[200px] absolute top-[calc(50%-100px)] left-[calc(50%-100px)]' src='https://i.gifer.com/OH2e.gif'/>
        <h1 className='absolute text-white top-[60%] left-[calc(50%-70px)] text-[30px] font-bold font-newrocker'>Cargando...</h1>
        <div className='bg-black opacity-60 absolute w-full h-full'></div>
    </div>
  )
}

export default Loading