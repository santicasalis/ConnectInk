import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from "swiper"
import { FaMapMarkedAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import "swiper/css/navigation"
import 'swiper/css';

export default function Card ({name, lastName, location, shopName, tattoos}){


    const imageLoader = ({src}) => {
        return src
    }

    return (
        <div className=" m-5  h-72 mx-8 bg-secondary-100 rounded text-white flex justify-start">
            <div className="ml-4 ">
            
            <Image
            loader={imageLoader}
            src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
            alt="profile pic"
            width={100}
            height={100}
            className="rounded-full  object-cover  m-2 mt-12 "
            />
            <h1 className="pl-16 mb-2 font-bold">{name} {lastName}</h1>
            <span>{shopName}</span>

            <FaMapMarkedAlt className="absolute  mt-1 w-20" />

            <p className="pl-16 font-bold">{location}</p>
            </div>
            <div>
            <Swiper
                spaceBetween={25}
                slidesPerView={3}
                navigation={true}
                
                className="text-center "
                style={{ maxWidth: '1100px', margin: 'auto', marginTop: "80px", marginLeft: "400px"   }}>
                {tattoos.map((tattoo) => {
                    return <SwiperSlide key={tattoo.image} className="ml-[90px]"><img className="w-[160px] h-[160px]" src={tattoo.image}></img></SwiperSlide>
                })}
            </Swiper>
            </div>
            <div className="flex justify-end items-start w-full ">
                <button className="text-4xl  ">♡ </button>
                <div className="flex mt-64 mr-2 text-2xl">
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                </div>
                
            </div>
            
            
           
    
        </div>
    )
}