import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from "swiper"
import { FaMapMarkedAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import "swiper/css/navigation"
import 'swiper/css';

export default function Card ({name, location, tattoo}){
    return (
        <div className=" m-5  h-72 mx-8 bg-secondary-100 rounded text-white flex justify-start">
            <div className="ml-4 ">
            
            <Image
            src={tattoo.src}
            alt={tattoo}
            width={500}
            height={500}
            className="rounded-full  object-cover  m-2 mt-12 "
            />
            <h1 className="pl-16 mb-2 font-bold">{name}</h1>

            <FaMapMarkedAlt className="absolute  mt-1 w-20" />

            <p className="pl-16 font-bold">{location}</p>
            </div>
            <div>
            <Swiper
             spaceBetween={25}
             slidesPerView={3}
             navigation={true}
             className="text-center  "
             style={{ maxWidth: '1100px', margin: 'auto', marginTop: "150px", marginLeft: "400px"   }}>
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
            </div>
            <div className="flex justify-end items-start w-full ">
                <button className="text-4xl mr-4">♡ </button>
                
                
            </div>
            <div className="flex mt-64 mr-2 text-2xl">
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                </div>
            
           
    
        </div>
    )
}