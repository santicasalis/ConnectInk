import Image from "next/image"
import { SlOptions } from "react-icons/sl";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { RiMoreFill, RiEyeLine, RiStarLine, RiStarSFill   } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { DeleteArtists } from "../../app/redux/features/artists/artistActions"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import Modal from 'react-modal';
import Link from "next/link";
import { openModalDeleteArtistAction } from "../../app/redux/features/modalDeleteArtist/modalDeleteArtistAction";
import Star from "../Star/Star";


export default function AdminCard({ fullName, location, shopName, image, id , reviews}) {

  const dispatch = useDispatch()
  const [rating , setRating] = useState(null);

  const calcPonderRating = (reviews) => {
    if(reviews?.length > 0){
      let ponderRating = 0;
      console.log(reviews)
      reviews?.map((review) => {
        return ponderRating += review.rating
      });
      setRating(ponderRating/reviews?.length);
    }
  }
  console.log(calcPonderRating, "CACLCCC")
  const handleBannear = () => {
    dispatch(openModalDeleteArtistAction(id))
  }

  useEffect(() => {
    calcPonderRating(reviews)
  },[reviews])

  const imageLoader = ({ src }) => {
    return src;
  };

  return (
     <div className="bg-secondary-100 w-[550px]  ml-[10px] mb-[10px] rounded-xl pb-5">
        <div className="flex gap-x-1 items-center p-4">
          <div className="w-[90px] h-[90px] rounded-full">
            <Image
              unoptimized
              className="rounded-full object-cover w-full h-full"
              src={image}
              loader={imageLoader}
              width={90}
              height={90}
              alt={`${fullName} profile pic`}
            />
          </div>
           <div className="max-w-[300px]">
          <h1 className="font-bolt text-center text-4xl font-newrocker ml-4">
            {fullName}
          </h1>
          </div>
          <div className='p-2 flex items-center justify-center ml-auto '>
            <Menu menuButton={
              <MenuButton >
                <RiMoreFill className='text-white text-[25px] cursor-pointer ' />
              </MenuButton>}
              transition
              menuClassName={'hover:bg-red text-red-500'}>
              <MenuItem>
                <Link href={`registeredArtists/${id}`} className='flex items-center gap-2 text-sm py-1.5'>
                  <RiEyeLine />
                  Ver Publicaciones
                </Link>
              </MenuItem>
              <MenuItem>
                <button onClick={handleBannear} className='flex items-center gap-2 text-sm py-1.5'>
                  <MdBlock />
                  Bannear artista
                </button>
              </MenuItem>
            </Menu>
          </div>
        </div>
        {/* <div className="font-bolt text-center text-4xl font-newrocker">
            {shopName}
          </div> */}
        <div className="font-bolt text-center text-xl mt-[20px] font-newrocker ">
          {shopName}
        </div>
        <div className="font-bolt text-center text-xl mt-[20px] font-newrocker">
          {location}
        </div>

        <div className="font-bolt text-center text-xl mt-[20px] mb-[10px] flex items-center justify-center">
          <Star value={1} rating={rating}/>
          <Star value={2} rating={rating}/>
          <Star value={3} rating={rating}/>
          <Star value={4} rating={rating}/>
          <Star value={5} rating={rating}/>
          {
            rating != null 
            ? <p className="ml-2 text-[22px]">{rating.toFixed(1)}</p>
            : <p className="ml-2 text-[22px]">0.0</p>
          }
        </div>

      </div>




    
  )
}
