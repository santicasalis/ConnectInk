"use client";

import React, { useEffect, useState } from "react";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiGoogleFill,
  RiReplyLine,
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
import { openModalLoadingAction } from "../redux/features/modalLoading/ModalLoadingActions.js";
import { closeModalLoadingAction } from "../redux/features/modalLoading/ModalLoadingActions.js";
import {
  getUserById,
  getUserInformation,
  logOut,
} from "../redux/features/user/userActions.js";
import { forgetPass } from "../utils/resetPassword.js";

const Login = () => {
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.userType) {
      if (user.userType == "artist") router.replace("/a-dashboard/home");
      if (user.userType == "customer") router.replace("/user-dashboard");
      if (user.userType == "admin") router.replace("/admin-dashboard/");
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
    dispatch(openModalLoadingAction());
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

      dispatch(getUserById(userFireBase.uid))
        .then(async () => {
          dispatch(
            getUserInformation({
              tokenId: userFireBase.uid,
              userName: userFireBase.displayName,
              image: userFireBase.photoURL,
              email: userFireBase.email,
              phoneNumber: userFireBase.phoneNumber,
            })
          );

          if (user.userType == "artist") {
            await new Promise((resolve) => {
              router.push("/a-dashboard/home").then(() => resolve());
            });
            dispatch(closeModalLoadingAction());
          }
          if (user.userType == "customer") {
            await new Promise((resolve) => {
              router.push("/user-dashboard").then(() => resolve());
            });
            dispatch(closeModalLoadingAction());
          }
          if (user.userType == "admin") {
            await new Promise((resolve) => {
              router.push("/admin-dashboard/").then(() => resolve());
            });
            dispatch(closeModalLoadingAction());
          }
        })
        .catch((error) => {
          toast.error("Tu cuenta ha sido suspendida", {
            className: "toastError",
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
          });
          dispatch(closeModalLoadingAction());
          dispatch(logOut());
        });
    } catch (createUserError) {
      dispatch(closeModalLoadingAction());
      toast.error("Usuario y/o contraseña errónea", {
        className: "toastError",
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="bg-secondary-900/90 opacity-90 flex  border-[1px] border-white/10  absolute rounded-3xl  w-1/2 items-center justify-center">
       <div className="flex flex-col w-[40%] border-r-[1px] border-r-white/10 p-3">
        <div className="mt-4 ml-4 mb-10 w-full">
            <Link
              href="/"
              className="flex items-center gap-x-1 hover:bg-secondary-100 rounded-lg p-2 w-[150px]"
            >
              <RiReplyLine className=" " />
              Volver al inicio
            </Link>
          </div>
        
        <div className="w-full h-[550px] border-transparent relative  flex flex-col items-center justify-center text-center px-8 ">
          <h2 className="font-rocksalt text-[40px] text-white/90 mb-2 absolute top-[calc(25%-50px)]">
            Te damos la bienvenida!
          </h2>
          <p className="text-primary/80 mb-8">
            Si no tienes cuenta, registrate aquí
          </p>
          <Link href="/auth/register">
            <span className=" text-[17px] py-3 px-5 border-[1px] border-primary rounded-3xl text-primary cursor-pointer hover:bg-primary/90 hover:text-white transition-colors">
              Registrarse
            </span>
          </Link>
        </div> 
      </div>
      {console.log(user)}
      <div className=" w-[40%] flex-1 flex flex-col items-center justify-center">
        <h2 className="font-rocksalt text-[40px] text-white/90 mb-4">
          Inicia Sesión
        </h2>
        <button
          onClick={googleLogIn}
          className="w-[50%] border-[1px] mb-2 border-primary hover:bg-primary/90 hover:text-white text-primary rounded-2xl flex gap-x-2 items-center justify-center py-2 px-5"
        >
          <RiGoogleFill /> Ingresar con Google
        </button>
        <p className="mb-4">O inicia sesión con tu cuenta</p>

        <form onSubmit={handleSubmit} className="mb-7 w-[60%]">
          <div className="relative mb-3">
            <RiMailLine className="absolute left-2 top-4 text-white/80" />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="py-3 pl-8 pr-4 bg-secondary-100 w-full outline-none rounded-2xl mb-4"
              placeholder="E-mail"
            />
          </div>
          <div className="relative mb-4">
            <RiLockLine className="absolute left-2 top-4 text-white/80" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              className="py-3 px-8 bg-secondary-100 w-full outline-none rounded-2xl mb-4 "
              placeholder="Contraseña"
            />
            {showPassword ? (
              <RiEyeLine
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
              />
            ) : (
              <RiEyeOffLine
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
              />
            )}
          </div>
          <div>
            <button
              type="submit"
              className="bg-primary/90 opacity-80  cursor-pointer font-bold text-white text-[18px] w-full py-3 px-4 rounded-lg hover:bg-primary/70 transition-colors"
              disabled={!data.email || !data.password}
            >
              Ingresar
            </button>
          </div>
          <span></span>
        </form>
        <p
          className="text-primary/80 mb-6 hover:text-primary cursor-pointer"
          onClick={() => forgetPass(data.email)}
        >
          ¿Has olvidado tu contraseña?{" "}
        </p>
        <div className=" h-80vh border-transparent border-r-[1px] border-r-white/10 flex flex-col items-center justify-center text-center px-8 ">
          <p className="text-primary/80 mb-6">
            ¿No tenés una cuenta? Registrate GRATIS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
