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
    console.log(image, "imageeeeen")
    return (
        <div className=" m-5  h-[300px] w-[800px] overflow-hidden bg-secondary-100 rounded shadow-lg  text-white transition-transform transform ">
            <div>
                <div className="grid grid-cols-2">
                <h1 className="font-bold ml-[35px] mt-[10px] col-span-1 ">{name}  {lastName} </h1>
                <p className="col-span-1 text-right text-2xl mr-4">☆☆☆☆☆</p>
                </div>
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
        </div>
        </div>
    )
}