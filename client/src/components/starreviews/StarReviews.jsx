import React, { useState, useEffect } from 'react'
import {RiStarLine, RiStarSFill } from "react-icons/ri";

const StarReviews = ({value, rating}) => {
    const [painted, setPainted] = useState(false);
    useEffect(() => {
        setPainted(value <= rating)
    },[rating]);
  return (
    <>
        {
            painted
            ? <RiStarSFill className='text-artist text-[25px] '/>
            : <RiStarLine className='text-artist text-[21px] ml-[3px] mr-[1px] '/>
        }
    </>
  )
}

export default StarReviews