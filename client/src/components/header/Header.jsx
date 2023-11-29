"use client";
import React, { useEffect, useState } from "react";
import {
  RiNotification3Line,
  RiArrowDownSLine,
  RiSettings5Fill,
  RiLogoutCircleRLine,
  RiReplyLine,
} from "react-icons/ri";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { logOut } from "@/app/redux/features/user/userActions";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const user = useSelector((state) => state.user);
  // const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const userInformation = {
  //         uid: user.uid,
  //         nombreCompleto: user.displayName || "Nombredefault",
  //         image:
  //           user.photoURL ||
  //           "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
  //         email: user.email,
  //         phoneNumber: user.phoneNumber || "123456789",
  //         provider: user.providerId,
  //         currentData: user.userMetadata,
  //       };
  //       console.log(auth);

  //       setUserInfo(userInformation);
  //       console.log(userInformation);
  //     } else {
  //       // No hay usuario autenticado
  //       setUserInfo(null);
  //     }
  //   });
  // }, [auth]);

  const imageLoader = ({ src }) => {
    return src;
  };
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        alert("sign out ok");
      })
      .catch((error) => {
        throw error;
      });
    dispatch(logOut());
    router.replace("/");
  };

  return (
    <header className=" bg-secondary-900 h-[8vh] md:h-[8vh] border-b border-gray-600 p-8 flex items-center justify-end">
      <nav className="w-full flex items-center gap-x-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-x-1 hover:bg-secondary-100 rounded-lg p-2"
        >
          <RiReplyLine className="" />
          Volver al inicio
        </Link>
        <div className="flex items-center gap-x-4">
          <button className="relative hover:bg-secondary-100 p-2 rounded-lg transition-colors">
            <RiNotification3Line />
            <span className="absolute -top-0 -right-0 bg-red-600 py-0.5 px-1 text-white rounded-full text-[8px] font-bold">
              2
            </span>
          </button>

          <Menu
            menuButton={
              <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 py-2 px-4 rounded-lg">
                <Image
                  src={userInfo?.image}
                  loader={imageLoader}
                  width={40}
                  height={40}
                  alt={`${userInfo?.nombreCompleto} profile pic`}
                />
                <span>{`${userInfo?.nombreCompleto}`}</span>
                <RiArrowDownSLine />
              </MenuButton>
            }
            menuStyle={{
              backgroundColor: "#252524",
              color: "white",
              padding: 3,
            }}
            transition
          >
            <MenuItem className="rounded-lg transition-colors border-b-2 border-gray-500/50">
              <Link
                href="/a-dashboard/profile"
                className="flex items-center gap-x-4"
              >
                <Image
                  src={userInfo?.image}
                  loader={imageLoader}
                  width={40}
                  height={40}
                  alt={`${userInfo?.nombreCompleto}  profile pic`}
                />
                <div className="flex flex-col gap-1 text-sm">
                  <span>{`${userInfo?.nombreCompleto}`}</span>
                  <span className="text-[9px]">{userInfo?.email}</span>
                </div>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="" className="flex items-center gap-2 text-sm py-1.5">
                <RiSettings5Fill />
                Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <button onClick={handleLogOut}>
                <RiLogoutCircleRLine />
                Logout
              </button>
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
