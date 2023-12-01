import Image from "next/image"
import { SlOptions } from "react-icons/sl";
import { Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { RiMoreFill,  RiEyeLine  } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import Link from "next/link";

export default function PostCards({fullName,image, id, description}){
 
        const imageLoader = ({ src }) => {
        return src;
      };

    return (
        <div>
            <div className="bg-secondary-100 w-[550px] h-[250px] ml-[10px] mb-[10px] rounded">
              <div className="flex gap-x-1 items-center">
                <h1 className="font-bold col-span-2">
                  {fullName}
                </h1>
                <Image
                  className="rounded-full object-cover"
                  src={image}
                  loader={imageLoader}
                  width={40}
                  height={40}
                  alt={`${fullName} profile pic`}
                 />

              </div>
              <div className="font-bolt text-center text-xl mt-[20px]">
                 {description}
              </div>
            </div>
        </div>
    )
}
