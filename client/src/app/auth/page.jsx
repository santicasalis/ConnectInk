"use client";

import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../redux/features/user/userActions";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.js";

const Login = () => {
  const artists = useSelector((state) => state.artists.people);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const googleLogIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user.metadata.createdAt;
      const userLastLog = result.user.metadata.lastLoginAt;

      if (Number(user) + 1 == userLastLog || user == userLastLog) {
        router.replace("/auth/register");
      } else {
        //ruta  para crear user viendo si es artist o customer
        router.replace("/a-dashboard/home");
      }
    } catch (error) {
      const errorCode = error.code;
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

      const user = auth.currentUser;
      router.replace("/a-dashboard/home");
    } catch (createUserError) {
      const errorCode = createUserError.code;
      const errorMessage = createUserError.message;

      console.error(
        `Error al crear un nuevo usuario: ${errorCode} - ${errorMessage}`
      );
    }
  };
  return (
    <div className=" div-img relative rounded-xl shadow-xl w-full xl:w-1/3 lg:w-1/4 md:w-1/2">
      <button onClick={googleLogIn} className="">
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
      <div className="bg-black absolute opacity-75 w-full h-full ">
        <img className="object-cover" src=" /dsgnlogin4.png " alt="" />
      </div>

      <h1 className="text-3xl text-center font-bold tracking-[3px] text-white mb-8">
        Ingresar
      </h1>
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
            <RiEyeOffLine
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
            />
          ) : (
            <RiEyeLine
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
            onClick={emailLogIn}
          >
            Ingresar
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-3 items-center">
        <Link
          href="/auth/forgot-password"
          className="text-gray-200 hover:text-primary transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <span className="flex items-center gap-2">
          Si no tienes una cuenta{" "}
          <Link
            href="/auth/register"
            className="text-primary hover:text-gray-100 transition-colors"
          >
            Registrate
          </Link>
        </span>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
