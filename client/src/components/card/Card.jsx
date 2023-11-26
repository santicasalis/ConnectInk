import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { RiArrowRightSLine, RiArrowLeftSLine, RiMapPinFill  } from "react-icons/ri";
import { FaMapMarkedAlt } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import "swiper/css/navigation"
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

export default function Card ({name, lastName, location, shopName, tattoos, image}){
    const imageLoader = ({src}) => {
        return src
    }
    
    return (
        <div className="m-5 p-4 h-[400px] w-[400px] hover:scale-105 bg-secondary-100 rounded shadow-lg text-white transition-transform transform relative">
           
                <div className="w-full mb-4">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-x-1 items-center">
                            <Image className="rounded-full object-cover" src={image} loader={imageLoader} width={40} height={40} alt={`${name} ${lastName} profile pic`} />
                            <h1 className="font-bold col-span-2">{name} {lastName}</h1>
                        </div>
                         <p className="text-right text-2xl col-span-2">☆☆☆☆☆</p>
                    </div>
                </div>
                {/* <div className="w-full p-2 flex justify-center items-center mb-10">
                    <RiArrowLeftSLine />
                    <div className="w-[80%] h-[200px]" >
                    <img src="data:image/jpeg;base64,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" 
                    className="w-full object-cover h-full "
                    />
                    </div>
                    <RiArrowRightSLine  />
                </div> */}
                <div className="w-full p-2 flex justify-center items-center mb-10">
                    <Swiper
                        spaceBetween={25}
                        slidesPerView={3}
                        navigation={true}
                        className="text-center w-full"
                    >
            {tattoos?.map((tattoo, index) => (
              <SwiperSlide key={tattoo.image} className="ml-[90px]">
                <Image loader={imageLoader} src={tattoo.image} width={160} height={160} alt={`tattoo ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
                </div>
                <div className=" flex justify-center items-center w-full gap-x-2">
                 <RiMapPinFill  className="text-red-700  " />
                     <p className="">{location}</p>
                </div>
    </div>
  );
}