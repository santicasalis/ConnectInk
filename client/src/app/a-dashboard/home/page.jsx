"use client";
import TopBarOptions from "@/components/topBarOptions/TopBarOptions";
import React, { useEffect } from "react";
import { auth } from "../../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import PostsDashboard from "@/components/postsDashboard/PostsDashboard";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Home = () => {
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "artist") {
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
