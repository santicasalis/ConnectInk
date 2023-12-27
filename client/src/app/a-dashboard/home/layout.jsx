"use client";

import TopBarOptions from "../../../components/topBarOptions/TopBarOptions";
import { RiAddFill } from "react-icons/ri";
import Link from "next/link";
import { openModalCreateAction } from "../../../app/redux/features/modalCreate/modalCreateAction";
import { useDispatch } from "react-redux";

export default function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openModalCreateAction());
  };
  return (
    <div className="bg-secondary-900 md:p-8 p-1 md:rounded-xl w-full shadow-artist/70 shadow-lg">
      <div className="flex justify-between ">
        <h1 className="text-4xl font-rocksalt text-artistfont/80 md:pl-5 pl-4 pt-4">
          Inicio
        </h1>
        <span
          onClick={handleClick}
          className="bg-artist md:text-[20px] text-[17px] font-newrocker hover:bg-artist/70 flex items-center justify-center gap-x-1 border-artist text-artistfont/80 border-[1px] rounded-md cursor-pointer md:mt-1 mt-4 md:mr-1 mr-3 px-2 py-2"
        >
          <RiAddFill className="font-bold " />
          Crear Publicación
        </span>
      </div>

      <hr className="my-8 border-artist/40" />
      {children}
    </div>
  );
}
