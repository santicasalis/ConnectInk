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
    <div className="m-5 p-4 bg-secondary-100 rounded shadow-lg text-white transition-transform transform">
      <div className="w-full mb-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-1 items-center">
            <Image
              className="rounded-full object-cover"
              src={image}
              loader={imageLoader}
              width={40}
              height={40}
              alt={`${fullName} profile pic`}
            />

            <h1 className="font-bold col-span-2">{fullName}</h1>
          </div>
          <p className="text-right text-2xl col-span-2">☆☆☆☆☆</p>
        </div>
      </div>

      <div className="w-full p-2 flex justify-center items-center mb-10">
        <button onClick={prevSlide}>
          <RiArrowLeftSLine />
        </button>

        <div className="flex justify-center items-center gap-x-8">
          {publications && publications.length > 0 ? (
            [...publications, ...publications, ...publications]
              .slice(currentStartIndex, currentStartIndex + 3)
              .map((tattoo, index) => (
                <Image
                  key={index}
                  loader={imageLoader}
                  src={tattoo.image}
                  width={200}
                  height={200}
                  alt={`tattoo ${index}`}
                />
              ))
          ) : (
            <div>
              {" "}
              <p>Cargando informacion... </p>{" "}
            </div>
          )}
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
