import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { RiMoreFill, RiEyeLine, RiStarLine, RiStarSFill, RiMapPin2Fill, RiHome8Fill } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { openModalDisabledArtistAction } from "../../app/redux/features/modalDisabledArtist/modalDisabledArtistAction";
import Star from "../Star/Star";


export default function AdminCardSuspended({
  fullName,
  location,
  shopName,
  image,
  id,
  reviews,
  email
}) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);
  const disabledArtists = useSelector((state) => state.artists.disabled);


  const calcPonderRating = (reviews) => {
    if (reviews?.length > 0) {
      let ponderRating = 0;
      console.log(reviews);
      reviews?.map((review) => {
        return (ponderRating += review.rating);
      });
      setRating(ponderRating / reviews?.length);
    }
  };
 
  const handleBanneados = () => {
    dispatch(openModalDisabledArtistAction({id, email}));
  };

  useEffect(() => {
     calcPonderRating(reviews);
  }, [dispatch, reviews]);

  const imageLoader = ({ src }) => {
    return src;
  };

  return (
    <div className="bg-secondary-100/50 w-[550px]   mb-[10px] rounded-xl pb-5 shadow-inner shadow-admin/10">
      <div className="flex gap-x-1 items-center p-4 mb-7">
        <div className="w-[70px] h-[70px] rounded-full">
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
        <div className="p-2 flex items-center justify-center ml-auto">
          <Menu
            menuButton={
              <MenuButton>
                <RiMoreFill className="text-white text-[25px] cursor-pointer " />
              </MenuButton>
            }
            transition
            menuClassName={"hover:bg-red text-red-500"}
          >
            <MenuItem >
              <button
                onClick={handleBanneados}
                className="flex items-center gap-2 text-sm py-1.5"
              >
                <MdBlock />
                Restablecer artista
              </button>
            </MenuItem>
          </Menu>
        </div>
      </div>

      <div className=" w-full justify-center flex items-center text-[25px] gap-x-1">
        <RiMapPin2Fill className="text-admin"/>
        {shopName}
      </div>
      <div className="font-bolt items-center justify-center flex text-xl mt-[20px] font-newrocker gap-x-1  w-full">
        <RiHome8Fill className="text-admin text-[25px]" />
        {location}
      </div>

      <div className="font-bolt text-center text-xl mt-[20px] mb-[10px] flex items-center justify-center">
        <Star value={1} rating={rating} />
        <Star value={2} rating={rating} />
        <Star value={3} rating={rating} />
        <Star value={4} rating={rating} />
        <Star value={5} rating={rating} />
        {rating != null ? (
          <p className="ml-2 text-[22px]">{rating.toFixed(1)}</p>
        ) : (
          <p className="ml-2 text-[22px]">0.0</p>
        )}
      </div>
    </div>
  );
}
