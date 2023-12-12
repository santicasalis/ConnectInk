import React, { useState, useEffect } from 'react'
import {RiStarLine, RiStarSFill } from "react-icons/ri";

const Star = ({value, rating}) => {
    const [painted, setPainted] = useState(false);
    useEffect(() => {
        setPainted(value <= rating)
    },[rating]);
  return (
    <>
        {
            painted
            ? <RiStarSFill className='text-admin text-[30px] '/>
            : <RiStarLine className='text-admin text-[25px] ml-[3px] mr-[2px] '/>
        }
    </>
  )
}

export default Star