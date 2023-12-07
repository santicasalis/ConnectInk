"use client";
import TopBarOptions from "../../../components/topBarOptions/TopBarOptions";
import React, { useEffect } from "react";
import { auth } from "../../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import PostsDashboard from '../../../components/postDashboard/PostDashboard'


const Home = () => {
  return (
    <div>
      <PostsDashboard />
    </div>
  );
};

export default Home;
