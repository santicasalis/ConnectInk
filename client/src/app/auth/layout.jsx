'use client'

import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
const Loading = dynamic(()=> import("../../components/loading/Loading"));

export default function AuthLayout({ children }) {
  const isOpenModalLoading = useSelector((state) => state.modalLoading.isOpen)
  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      <img
        src="https://images3.alphacoders.com/866/866852.jpg"
        className="w-full h-full absolute  object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full custom-gradient-login"></div>
      {children}
      {isOpenModalLoading && <div className="absolute w-full h-full"><Loading /></div>}
    </div>
  );
}
