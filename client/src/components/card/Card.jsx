import React, { useState } from "react";
import Image from "next/image";
import {
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiMapPinFill,
} from "react-icons/ri";
import { FaMapMarkedAlt } from "react-icons/fa";
import { CiShop } from "react-icons/ci";

export default function Card({
  name,
  lastName,
  location,
  shopName,
  tattoos,
  image,
}) {
  const imageLoader = ({ src }) => {
    return src;
  };

// if(!tattoos || tattoos.length  === 0) {
//   return <div>Cargando informacion...</div>
// }

  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  const nextSlide = () => {
    setCurrentStartIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex > tattoos.length - 2 ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentStartIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? tattoos.length - 2 : nextIndex;
    });
  };

  console.log(tattoos, "ufdilsadhjld")

  return (
    <div className="m-5 p-4 hover:scale-105 bg-secondary-100 rounded shadow-lg text-white transition-transform transform">
      <div className="w-full mb-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-1 items-center">
            <Image
              className="rounded-full object-cover"
              src={image}
              loader={imageLoader}
              width={40}
              height={40}
              alt={`${name} ${lastName} profile pic`}
            />
            <h1 className="font-bold col-span-2">
              {name} {lastName}
            </h1>
          </div>
          <p className="text-right text-2xl col-span-2">☆☆☆☆☆</p>
        </div>
      </div>

      <div className="w-full p-2 flex justify-center items-center mb-10">
        <button onClick={prevSlide}>
          <RiArrowLeftSLine />
        </button>
        <div className="flex justify-center items-center gap-x-4">
          {tattoos? tattoos
            .slice(currentStartIndex, currentStartIndex + 2)
            .map((tattoo, index) => (
              <Image
                key={tattoo.image}
                loader={imageLoader}
                src={tattoo.image}
                width={160}
                height={160}
                alt={`tattoo ${index}`}
              />
            )): <div> <p>Cargando informacion... </p> </div> }
        </div>
        <button onClick={nextSlide}>
          <RiArrowRightSLine />
        </button>
      </div>

      <div className="flex justify-center items-center w-full gap-x-2">
        <RiMapPinFill className="text-red-700" />
        <p>{location}</p>
      </div>
    </div>
  );
}

// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import {
//   RiArrowRightSLine,
//   RiArrowLeftSLine,
//   RiMapPinFill,
// } from "react-icons/ri";
// import { FaMapMarkedAlt } from "react-icons/fa";
// import { CiShop } from "react-icons/ci";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import "swiper/css";

// export default function Card({
//   name,
//   lastName,
//   location,
//   shopName,
//   tattoos,
//   image,
// }) {
//   const imageLoader = ({ src }) => {
//     return src;
//   };
//   console.log(image, "IMAGEN********");

//   return (

//     <div className="m-5 p-4 hover:scale-105 bg-secondary-100 rounded shadow-lg text-white transition-transform transform">
//       <div className="w-full mb-4">
//         <div className="flex justify-between items-center">
//           <div className="flex gap-x-1 items-center">
//             <Image
//               className="rounded-full object-cover"
//               src={image}
//               loader={imageLoader}
//               width={40}
//               height={40}
//               alt={`${name} ${lastName} profile pic`}
//             />
//             <h1 className="font-bold col-span-2">
//               {name} {lastName}
//             </h1>
//           </div>
//           <p className="text-right text-2xl col-span-2">☆☆☆☆☆</p>
//         </div>
//       </div>

//       <div className="w-full p-2 flex justify-center items-center mb-10">
//         <Swiper
//           spaceBetween={25}
//           slidesPerView={3}
//           navigation={true}
//           className="text-center w-full"
//         >
//           {tattoos?.map((tattoo, index) => (
//             <SwiperSlide key={tattoo.image} className="ml-[90px]">
//               <Image
//                 loader={imageLoader}
//                 src={tattoo.image}
//                 width={160}
//                 height={160}
//                 alt={`tattoo ${index}`}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       <div className=" flex justify-center items-center w-full gap-x-2">
//         <RiMapPinFill className="text-red-700  " />
//         <p className="">{location}</p>
//       </div>
//     </div>
//   );
// }
