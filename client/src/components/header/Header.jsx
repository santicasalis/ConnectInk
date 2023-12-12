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
import { logOut } from "../../app/redux/features/user/userActions";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";
import { getAllArtists } from "../../app/redux/features/artists/artistActions";

const Header = () => {
  const user = useSelector((state) => state.user.logedInUser);
  const dispatch = useDispatch();
  const router = useRouter();
  // let userEmail = auth.currentUser?.email;
  // let username = userEmail?.split("@")[0];

  // let usuarioEncontrado = allArtist.people.find(
  //   (usuario) => usuario.email === userEmail
  // );

  // let imgUser = auth.currentUser?.photoURL;
  // if (!imgUser) {
  //   imgUser = usuarioEncontrado?.image;
  // }
  // if (!imgUser) {
  //   imgUser =
  //     "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg";
  // }

  const imageLoader = ({ src }) => {
    return src;
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => {
        notifyError(error);
        throw error;
      });

    router.replace("/");
  };

  return (
    <header className=" bg-secondary-900 h-[8vh] md:h-[8vh] border-b border-gray-600 p-8 flex items-center justify-end">
      <nav className="w-full flex items-center gap-x-4 justify-between">
        <Link
          href="/explore"
          className="flex items-center gap-x-1 hover:bg-secondary-100 rounded-lg p-2 text-artistfont font-newrocker text-[17px]"
        >
          <RiReplyLine className="" />
          ir a Explorar
        </Link>
        <div className="flex items-center gap-x-4">
          <Menu
            menuButton={
              <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 py-2 px-4 rounded-lg">
                <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
                  {user.image && 
                  <Image
                    unoptimized
                    src={user.image}
                    loader={imageLoader}
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                    }}
                    width={40}
                    height={40}
                    alt={user.fullName}
                  />
                  }
                </div>

                <span className="text-artistfont">{`${user.fullName}`}</span>
                <RiArrowDownSLine className="text-artistfont" />
              </MenuButton>
            }
            menuStyle={{
              backgroundColor: "#252524",
              color: "white",
              padding: 3,
              width: "220px",
            }}
            transition
          >
            <MenuItem className="rounded-lg transition-colors  border-b-2 border-gray-500/50 hover:bg-secondary-100 w-full h-full">
              <Link
                href="/a-dashboard/profile"
                className="flex items-center gap-x-4 w-full h-[40px]"
              >
                <div className="rounded-full w-[25px] h-[25px] overflow-hidden">
                  {user.image &&
                  <Image
                    unoptimized
                    src={user.image}
                    loader={imageLoader}
                    width={25}
                    height={25}
                    style={{ width: "100%", height: "100%" }}
                    alt={`${user.fullName} profile pic`}
                  />
                  }
                </div>
                <div className="flex flex-col gap-1 text-sm text-artistfont">
                  <span>{`${user.fullName}`}</span>
                  <span className="text-[9px]">{user.email}</span>
                </div>
              </Link>
            </MenuItem>
            <MenuItem className="hover:bg-secondary-100 text-artistfont">
              <Link href="" className="flex items-center gap-2  py-1.5">
                <RiSettings5Fill className="text-artistfont/70" />
                Configuración
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleLogOut}
              className="hover:bg-secondary-100 text-artistfont"
            >
              <button className="flex gap-x-2">
                <RiLogoutCircleRLine className="text-artistfont" />
                Cerrar sesión
              </button>
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
