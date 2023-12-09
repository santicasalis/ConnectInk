"use client";
import TopBarOptions from "@/components/topBarOptions/TopBarOptions";

import React from "react";
import { auth } from "../../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import PostsDashboard from '@/components/postsDashboard/PostsDashboard'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation.js";


const Home = () => {

  const user = useSelector((state) => state.user.logedInUser)
  const router = useRouter()

  useEffect(() => {
    if(!user.userType){
      router.replace("/auth")
    } else if(user.userType !== "customer"){
      router.replace("/")
    }
  }, [])
  return (
    <div>
      <h1>EL PAGO FALLO, INTENTALO MAS TARDE</h1>
      {/* <PostsDashboard /> */}
    </div>
  );
};

export default Home;
