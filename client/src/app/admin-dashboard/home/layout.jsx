import TopBarOptions from "@/components/topBarOptions/TopBarOptions";
import { RiAddFill } from "react-icons/ri";
import Link from "next/link";

export default function HomeLayout({ children }) {
  return (
    <div className="bg-secondary-900 p-8 rounded-xl w-full">
      <div className="flex justify-between ">
        <h1 className="text-4xl font-rocksalt">Inicio</h1>
        <Link href="/a-dashboard/home/createpost">
          <span className="hover:bg-white hover:text-black flex items-center gap-1 border-gray-300 text-gray-300 border-[1px] px-2 py-3 rounded-md cursor-pointer">
            <RiAddFill className="font-bold " />
            Crear Publicacion
          </span>
        </Link>
      </div>

      <hr className="my-8 border-gray-500" />
      <TopBarOptions />
      {children}
    </div>
  );
}
