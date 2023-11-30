"use client";

import Nav from "@/components/nav/Nav";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllStyles } from "./redux/features/styles/stylesActions";
import { getAllArtists } from "./redux/features/artists/artistActions";
import { getAllPosts } from "./redux/features/posts/postsActions";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStyles());
    dispatch(getAllArtists());
    dispatch(getAllPosts())
    // signOut(auth)
    //   .then(() => {
    //     // Sign-out successful.
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //   });
  }, []);
  return (
    <div className="flex flex-col w-full min-h-screen p-0 overflow-hidden bg-secondary-900">
      <Nav />
      <div
        className="flex flex-col bg-secondary-900 justify-between overflow-hidden text-center text-white w-full"
        // style={{ textAlign: "center", color: "#fff", width: "100%" }}
      >
        <div className="flex flex-col w-full px-8 py-10 lg:py-1">
          <h1
            className="text-white/80 font-rocksalt mb-8 "
            style={{ fontSize: "4rem" }}
          >
            Los mejores artistas y
          </h1>
          <h1 className="font-rocksalt mb-10" style={{ fontSize: "4rem" }}>
            TATTOOS
          </h1>
          <p className="text-primary/80 mb-10 font-newrocker text-[25px]">
            ConnectInk es el lugar
          </p>
        </div>
        <div className="w-full relative overflow-hidden ">
          <img
            className="w-full h-[440px] object-cover mt-auto "
            src="https://images3.alphacoders.com/866/866852.jpg"
          />
          <div className="absolute top-0 left-0 w-full h-full custom-gradient"></div>
        </div>
      </div>
    </div>
  );
}
