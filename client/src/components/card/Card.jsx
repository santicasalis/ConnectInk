'use client'

import React, { useState } from "react";
import { RiStarLine } from "react-icons/ri";
import Image from "next/image";
import {
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiMapPinFill,
} from "react-icons/ri";
import { FaMapMarkedAlt } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay, Parallax } from 'swiper/modules';

export default function Card({
  id,
  fullName,
  location,
  shopName,
  publications,
  image,
}) {
  const imageLoader = ({ src }) => {
    return src;
  };

  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  const nextSlide = () => {
    setCurrentStartIndex((prevIndex) => {
      let nextIndex = prevIndex + 1;

      if (nextIndex > tattoos.length - 1) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  };
  console.log(publications);
  const prevSlide = () => {
    setCurrentStartIndex((prevIndex) => {
      let nextIndex = prevIndex - 1;

      if (nextIndex < 0) {
        nextIndex = tattoos.length - 1;
      }
      return nextIndex;
    });
  };

  return (
    <div className="w-[900px] mb-5 p-4 bg-secondary-900 rounded-2xl  text-white transition-transform transform">
      <div className="w-full mb-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-1 items-center">
            <Image
            unoptimized
              className="rounded-full object-cover"
              src={image}
              loader={imageLoader}
              width={40}
              height={40}
              alt={`${fullName} profile pic`}
            />

            <h1 className="font-bold col-span-2">{fullName}</h1>
          </div>
          <div className="flex gap-x-0.5">
                <RiStarLine className="text-[20px]"/>
                <RiStarLine className="text-[20px]"/>
                <RiStarLine className="text-[20px]"/>
                <RiStarLine className="text-[20px]"/>
                <RiStarLine className="text-[20px]"/>
          </div>
        </div>
      </div>

      <div className="w-full h-[180px] p-2 flex justify-center items-center mb-10 ">
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
                    className="w-[50%] flex justify-center items-center relative  p-5  h-[250px] rounded "
                  >
                    {publications.map( publi => {
                      return (
                        <SwiperSlide className="object-cover">
                          <img 
                          src={publi.image}
                          alt={` error al cargar img`}
                          
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
      </div>

      <div className="flex justify-center items-center w-full gap-x-2">
        <RiMapPinFill className="text-red-700" />
        <p>{location}</p>
      </div>
    </div>
  );
}
