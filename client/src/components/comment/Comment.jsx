import React from 'react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns';

const Comment = ({comment}) => {
  const removeAboutAgo = (distance) => {
    return distance.replace(/(?:about|ago)/gi, '').trim();
  };

  const formatDistance = (date) => {
      if (!date) return '';
      const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
      const cleanedDistance = removeAboutAgo(distance);
      return cleanedDistance;
  };

  const imageLoader = ({src}) => {
    return src
  } 
  return (
    <div className='flex items-start px-4 mb-4 '>
        <div className='w-[35px] h-[35px] min-w-[35px] rounded-full overflow-hidden mr-2 mt-1'>
          {
            comment.customer?.image && <Image loader={imageLoader} src={comment.customer.image} width={35} height={35} className='rounded-full w-full h-full object-cover'/> 
          }   
        </div>
        <div className='max-w-[calc(100%-35px)]'>
          <p className=''>
              <span className='font-bold text-artistfont cursor-default  flex flex-shrink-0'>{comment?.customer?.fullName}</span>
              <span className='whitespace-normal flex-grow break-words text-artistfont'>
                {comment.text}
              </span>
          </p>
          <div>
            <h3 className='text-artistfont/70 text-[15px]'>{formatDistance(comment.createdAt)}</h3>
          </div>
        </div>
        
    </div>
  )
}

export default Comment