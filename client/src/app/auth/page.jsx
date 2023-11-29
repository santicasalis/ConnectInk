"use client";

import React, { useState } from "react";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserByEmail } from "../redux/features/user/userActions";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(getUserByEmail(data.email, data.password, router, toast));
  };

  return (
    <div className=" div-img relative rounded-xl shadow-xl w-full xl:w-1/3 lg:w-1/4 md:w-1/2">
      <div className="bg-black absolute opacity-75 w-full h-full ">
        <img className="object-cover" src=" /dsgnlogin4.png " alt="" />
      </div>

      <h1 className="text-3xl text-center font-bold tracking-[3px] text-white mb-8">
        Ingresar
      </h1>
      <form onSubmit={handleSubmit} className="mb-7">
        <button className="flex items-center justify-center gap-4 mb-8 bg-secondary-900 w-full py-3 px-4 rounded-xl text-gray-100">
          <img
            src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
            className="w-4 h-4"
          />
          Ingresar con Google
        </button>
        <div className="relative mb-3">
          <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
            placeholder="E-mail"
          />
        </div>
        <div className="relative mb-4">
          <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
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
    </div>
  );
};

export default Login;
