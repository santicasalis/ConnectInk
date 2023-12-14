"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiArrowDownSLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useDispatch, useSelector } from "react-redux";
import { openModalLoadingAction } from "../../app/redux/features/modalLoading/ModalLoadingActions";
import { useRouter } from "next/navigation";

export default function Nav() {
  const dispatch = useDispatch();
  const router = useRouter();
  const imageLoader = ({ src }) => {
    return src;
  };
  const user = useSelector((state) => state.user.logedInUser);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (user.fullName) {
      setUserLoaded(true);
    }
  }, [user]);
  return (
    <nav className="bg-transparent py-8 px-8 text-artistfont mb-[30px] ">
      <ul className="flex flex-col sm:flex-row  items-center justify-center sm:justify-between gap-8">
        <div className="text-center sm:flex sm:justify-center">
          <li>
            <Link href="/">
              <span className="font-rocksalt text-2xl ">
                Connect
                <span className="text-primary">
                  Ink<span className="text-3xl">!</span>
                </span>
              </span>
            </Link>
          </li>
        </div>
        <div className="flex items-center gap-x-8">
          <li>
            <Link href="/about">
              <span className="hover:text-primary  hover:border-primary pb-1 font-newrocker text-[19px] border-b-[2px] border-gray-200">
                Nosotros
              </span>
            </Link>
          </li>
          <li>
            <Link href="/explore">
              <span className=" hover:text-primary cursor-pointer hover:border-primary pb-1 font-newrocker text-[19px] border-b-[2px]  border-gray-200">
                Explorar
              </span>
            </Link>
          </li>
          <li>
            <div>
              <Link
                href={
                  !user.userType
                    ? "/auth"
                    : user.userType == "artist"
                    ? "/a-dashboard/home"
                    : user.userType == "customer"
                    ? "/user-dashboard"
                    : "/admin-dashboard/home"
                }
              >
                {userLoaded ? (
                  <Image
                    unoptimized
                    loader={imageLoader}
                    src={
                      user?.image ||
                      "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                    }
                    width={40}
                    height={40}
                    alt={user?.fullName}
                    style={{
                      borderRadius: "50%",
                    }}
                    className={`w-[40px] h-[40px] rounded-full`}
                  />
                ) : (
                  <span
                    className={`hover:bg-black hover:text-primary hover:border-primary p-2 rounded-lg font-newrocker text-[19px] border-[2px]  border-gray-200`}
                  >
                    Ingresar
                  </span>
                )}
              </Link>
            </div>
          </li>
        </div>
      </ul>
    </nav>
  );
}
