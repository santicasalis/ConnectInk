"use client";
import TopBarOptions from "../../../components/topBarOptions/TopBarOptions";

import React from "react";
import { auth } from "../../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import PostsDashboard from '../../../components/postsDashboard/PostsDashboard'


const Home = () => {
  return (
    <div>
      <h1>EL PAGO FALLO, INTENTALO MAS TARDE</h1>
      {/* <PostsDashboard /> */}
    </div>
  );
};

export default Home;
