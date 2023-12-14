"use client";

import React, { useState,useEffect } from "react";
import { RiStarLine } from "react-icons/ri";
import Image from "next/image";
import {
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiMapPinFill,
} from "react-icons/ri";
import { FaMapMarkedAlt } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay, Parallax } from "swiper/modules";
import Link from "next/link";
import Star from "../Star/Star";
import StarDetail from "../stardetail/StarDetail"

export default function Card({
  id,
  fullName,
  location,
  shopName,
  publications,
  image,
  reviews
}) {
  const imageLoader = ({ src }) => {
    return src;
  };

 // console.log(reviews, "REVVV")
  const [rating , setRating] = useState(null);

  const calcPonderRating = (reviews) => {
    
    if(reviews?.length > 0){
      let ponderRating = 0;
      
      reviews?.map((review) => {
        return ponderRating += review.rating
      });
      setRating(ponderRating/reviews?.length);
    }
    
  }

  useEffect(() => {
    calcPonderRating(reviews)
  },[reviews])

  return (
    <div className="w-[1000px] mb-5 mr-4 ml-4 pb-4 border-b-primary/50 border-transparent border-[1px]  transition-transform transform ">
      <div className="w-full py-3">
        <div className="flex flex-row justify-between items-center ">
          <Link href={`/explore/${id}`}>
            <div className="flex  items-center gap-x-2 ">
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                {image &&
                <Image
                  unoptimized
                  className="rounded-full object-cover w-full h-full"
                  src={image}
                  loader={imageLoader}
                  width={40}
                  style={{borderRadius:'50%'}}
                  height={40}
                  alt={`${fullName} profile pic`}
                />
                }
              </div>

              <h1 className="font-bold col-span-2  text-artistfont">{fullName}</h1>
            </div>
          </Link>

          
        <div className="font-bolt text-center text-xl mt-[20px] mb-[10px] flex items-center justify-center">
          <StarDetail value={1} rating={rating}/>
          <StarDetail value={2} rating={rating}/>
          <StarDetail value={3} rating={rating}/>
          <StarDetail value={4} rating={rating}/>
          <StarDetail value={5} rating={rating}/>
          
          {
            rating != null 
            ? <p className="ml-2 text-[22px]">{rating.toFixed(1)}</p>
            : <p className="ml-2 text-[22px]">0.0</p>
          }
        </div>
        </div>
      </div>

      <div className="w-full h-[400px] mb-4">
        <Swiper
          spaceBetween={25}
          parallax={true}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Parallax, Autoplay, Pagination, Navigation]}
          className="w-full flex justify-center items-center relative p-5 h-full rounded"
        >
          {publications.map((publi, index) => (
            <SwiperSlide key={index} className="object-cover ">
              <img
                src={publi.image}
                alt={` error al cargar img`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center items-center w-full gap-x-2">
        <RiMapPinFill className="text-red-700" />
        <p className=" text-artistfont">{location}</p>
      </div>
    </div>
  );
}
