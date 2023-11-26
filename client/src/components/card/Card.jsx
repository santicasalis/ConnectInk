import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';

import { FaMapMarkedAlt } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import "swiper/css/navigation"
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

export default function Card ({name, lastName, location, shopName, tattoos}){
    const imageLoader = ({src}) => {
        return src
    }
    return (
        <div className=" m-5  h-[300px] w-[800px]  bg-secondary-100 rounded shadow-lg  text-white transition-transform transform hover:scale-105 ">
            <div>
                <div className="grid grid-cols-2">
                <h1 className="font-bold ml-[35px] mt-[10px] col-span-1 ">{name}  {lastName} </h1>
                <p className="col-span-1 text-right text-2xl mr-4">☆☆☆☆☆</p>
                </div>
                
                <img src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg" className="rounded-full w-[120px] h-[120px] object-cover m-4"></img>
                <div className="grid grid-cols-2 w-[165px] ">
                <FaMapMarkedAlt className=" text-primary w-20 col-span-1" />
                <p className="col-span-1 text-left  absolute  translate-x-[60px]">{location}</p>
                </div>
                <div className="flex justify-center items-center ml-[80px] absolute top-[150px] left-[160px]   ">
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
                
            </div>
          
            
            
           
    
        </div>
    )
}