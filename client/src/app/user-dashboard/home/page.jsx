"use client";
import TopBarOptions from "../../../components/topBarOptions/TopBarOptions";

import React from "react";
import { auth } from "../../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
<<<<<<< HEAD
import PostsDashboard from "@/components/postsDashboard/PostsDashboard";
=======
import PostsDashboard from '../../../components/postsDashboard/PostsDashboard'
>>>>>>> cd197c63b1de3e53997ea50c24615846b9d70259
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation.js";

const Home = () => {
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "customer") {
      router.replace("/");
    }
  }, []);
  return (
    <div>
      <PostsDashboard />
    </div>
  );
};

export default Home;
