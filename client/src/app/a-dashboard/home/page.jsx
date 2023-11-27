"use client";
import TopBarOptions from "@/components/topBarOptions/TopBarOptions";
import React, { useEffect } from "react";
import { auth } from "../../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const userInfo = {
          uid: user.uid,
          nombreCompleto: user.displayName,
          image: user.photoURL,
          email: user.email,
          phoneNumber: user.phoneNumber,
          provider: user.providerId,
        };

        console.log(userInfo);
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return <div>Inicio</div>;
};

export default Home;
