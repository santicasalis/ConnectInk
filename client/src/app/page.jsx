"use client";

import React, { useState, useEffect } from "react";
import Nav from "../components/nav/Nav";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "./redux/features/styles/stylesActions";
import { getAllArtists } from "./redux/features/artists/artistActions";
import { getAllPosts } from "./redux/features/posts/postsActions";

const Loading = dynamic(() => import("../components/loading/Loading"));

export default function Home() {
  const dispatch = useDispatch();
  const isOpenModalLoading = useSelector((state) => state.modalLoading.isOpen);

  useEffect(() => {
    dispatch(getAllStyles());
    dispatch(getAllArtists());
    dispatch(getAllPosts());
  }, []);

  return (
    <div className="flex flex-col w-full h-screen p-0 overflow-hidden relative">
      {isOpenModalLoading && (
        <div className="absolute w-full h-full">
          <Loading />
        </div>
      )}
      <div className="w-full h-full relative overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://images3.alphacoders.com/866/866852.jpg"
        />
        <div className="absolute top-0 left-0 w-full h-full custom-gradient">
          <Nav />
          <div className="flex flex-col items-center w-full px-8 py-10 lg:py-1 text-center">
            <h1 className="text-artistfont text-4xl font-rocksalt mb-8">
              Los mejores artistas y
            </h1>
            <h1 className="font-rocksalt mb-10 text-4xl text-artistfont">
              TATUAJES
            </h1>
            <p className="text-primary/80 mb-10 font-newrocker text-[25px]">
              ConnectInk es el lugar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
