"use client";

import React, { useEffect, useState } from "react";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase.js";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getAllArtists } from "../redux/features/artists/artistActions.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  getUserInformation,
} from "../redux/features/user/userActions.js";

const Login = () => {
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (user.userType == "artist") router.replace("/a-dashboard/home");
      if (user.userType == "customer") router.replace("/user-dashboard/home");
      if (user.userType == "admin") router.replace("/admin-dashboard/home");
    }
  }, [user]);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    emailLogIn();
  };

  const googleLogIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      const fireBaseUser = result.user;
      const token = fireBaseUser.uid;

      dispatch(getUserById(token, router));

      dispatch(
        getUserInformation({
          tokenId: fireBaseUser.uid,
          userName: fireBaseUser.displayName,
          image: fireBaseUser.photoURL,
          email: fireBaseUser.email,
          phoneNumber: fireBaseUser.phoneNumber,
        })
      );
    } catch (error) {
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error(`${errorMessage}`, {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      });

      throw error;
    }
  };

  const emailLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      const userFireBase = auth.currentUser;
      const token = userFireBase.reloadUserInfo.localId;

      dispatch(getUserById(token));

      if (user.userType == "artist") router.replace("/a-dashboard/home");
      if (user.userType == "customer") router.replace("/user-dashboard/home");
      if (user.userType == "admin") router.replace("/admin-dashboard/home");
    } catch (createUserError) {
      const errorCode = createUserError.code;
      const errorMessage = createUserError.message;

      console.error(
        `Error al crear un nuevo usuario: ${errorCode} - ${errorMessage}`
      );
    }
  };
  return (
    <div className="bg-secondary-900 absolute rounded-xl w-full xl:w-1/3 lg:w-1/4 md:w-1/2 p-9">
      <button onClick={googleLogIn} className="w-full ">
        <img
          src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
          className="w-4 h-4"
        />
        Ingresar con Google
      </button>
      <Link
        href="/auth/register"
        className="text-primary hover:text-gray-100 transition-colors"
      >
        Registrate
      </Link>
      <div className=" absolute opacity-75 w-full h-full ">
        <img className="object-cover" src="  " alt="" />
      </div>

      <form onSubmit={handleSubmit} className="mb-7">
        <div className="relative mb-3">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
            placeholder="E-mail"
          />
        </div>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg"
            placeholder="Contraseña"
          />
          {showPassword ? (
            <RiEyeLine
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
            />
          ) : (
            <RiEyeOffLine
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
            />
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-black opacity-50 text-white uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            disabled={!data.email || !data.password}
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
