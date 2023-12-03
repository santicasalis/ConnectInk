"use client"
import AdminSideBar from "@/components/adminsidebar/AdminSideBar";
import Header from "@/components/header/Header";
import Link from 'next/link'
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const ModalDeleteArtist = dynamic(()=> import("@/components/modal/ModalDeleteArtist"))


export default function DashboardLayout({ children }) {
    const isOpenModalDeleteArtist = useSelector((state) => state.modalDeleteArtist.isOpen);
   
    

    return (
          <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 relative">
                {
                    isOpenModalDeleteArtist && <ModalDeleteArtist className="absolute" />
                }
               
                <AdminSideBar /> 
                <div className="xl:col-span-5 ">
                    <Header/>
                    <div className="h-[92vh] overflow-y-scroll p-8 flex flex-col items-center font-bold text-gray-300 text-sm w-full">
                        {children}
                    </div>
                </div>
          </div>
    )
  }
  