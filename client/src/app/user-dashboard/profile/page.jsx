"use client";

import { RiEdit2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { RiEyeLine, RiEyeOffLine, RiSave3Fill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { bringUserInformation } from "../../../app/redux/features/user/userActions";
import axios from "axios";
import { getAuth, updatePassword } from "firebase/auth";
import { notifyError } from "../../../components/notifyError/NotifyError";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import {
  validateName,
  validatePassword,
  comparePasswords,
} from "./validations.js";

const UProfile = () => {
  const user = useSelector((state) => state.user.logedInUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [initialData, setInitialData] = useState({});
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "customer") {
      router.replace("/");
    }
  }, []);

  const imageLoader = ({ src }) => {
    return src;
  };
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    image: user.image,
    password: user.password,
    phone: user.phone,
  });

  useEffect(() => {
    setInitialData({ ...user });
    setFormData({
      fullName: user.fullName,
      email: user.email,
      image: user.image,
      password: user.password,
      phone: user.phone,
      instagram: user?.instagram,
      description: user?.description,
    });
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialData[key]) {
        updatedFields[key] = formData[key];
      }
    });

    if (formData.password && formData.password !== confirmPassword) {
      notifyError("Las contraseñas no coinciden");
      return;
    }

    try {
      const auth = getAuth();
      const firebaseUser = auth.currentUser;

      if (firebaseUser) {
        await updatePassword(firebaseUser, formData.password);
        console.log("Contraseña actualizada con éxito en Firebase");
      } else {
        notifyError("No hay usuario de Firebase autenticado");
        return;
      }

      const response = await axios.put(
        `http://localhost:3001/customers/${user.id}`,
        updatedFields
      );

      setImage(null);

      if (response.status === 200) {
        dispatch(bringUserInformation(updatedFields));
        console.log("Datos actualizados con éxito");

        setFormData({ ...formData, password: "" });
        setConfirmPassword("");
      }

      toast.success(`Cambios guardados con exito!`, {
        className: "toastSuccess",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      notifyError("Error al actualizar datos", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setFormData({ ...formData, fullName: newValue });
    const errorMessage = validateName(newValue);
    setNameError(errorMessage);
    setIsNameValid(!errorMessage);
  };

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    setFormData({ ...formData, password: newValue });
    const errorMessage = validatePassword(newValue);
    setPasswordError(errorMessage);
    setIsPasswordValid(!errorMessage);
    setArePasswordsEqual(comparePasswords(newValue, confirmPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    const errorMessage = comparePasswords(formData.password, newValue);
    setConfirmPasswordError(errorMessage);
    setArePasswordsEqual(!errorMessage);
  };

  return (
    <div className="bg-secondary-900 p-8 rounded-xl w-full shadow-lg shadow-primary/50">
      <h1 className="text-4xl text-artistfont font-rocksalt"> Mi perfil</h1>
      <hr className="my-8 border-primary/30" />
      <form onSubmit={handleUpdate}>
        <div className="flex items-center mb-6">
          <div className="sm:w-1/5 w-2/5">
            <p className="text-artistfont">Foto de perfil: </p>
          </div>
          <div className="flex-1">
            <div className="relative mb-2 flex justify-between items-center">
              <CldUploadWidget
                uploadPreset="cloudinary-upload-images-connectInk"
                onUpload={(result) => {
                  setFormData({ ...formData, image: result.info.secure_url });
                  setImage(result.info.secure_url);
                }}
              >
                {({ open }) => {
                  return (
                    <button
                      type="button"
                      className="absolute bg-secondary-900 p-2 left-24 -top-2 rounded-full cursor-pointer hover:bg-secondary-100"
                      onClick={() => open()}
                    >
                      <RiEdit2Line />
                    </button>
                  );
                }}
              </CldUploadWidget>

              {user.image && (
                <div>
                  <Image
                    unoptimized
                    src={user.image}
                    loader={imageLoader}
                    width={80}
                    height={80}
                    alt={`${user.fullName} profile pic`}
                  />
                </div>
              )}

              {image && (
                <div>
                  <p>Nueva imagen de perfil:</p>
                  <Image
                    src={image}
                    loader={imageLoader}
                    unoptimized
                    alt="tattoo image"
                    height={80}
                    width={80}
                  />
                </div>
              )}
              {image && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, image: null });
                    setImage(null);
                  }}
                  className="bg-red-500 text-white p-2 rounded w-[20%] text-[15px] mt-3 "
                >
                  Delete Image
                </button>
              )}
            </div>
            <p className="text-gray-500 text-sm"></p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="sm:w-1/5 w-2/5">
            <p className="text-artistfont">
              Nombre Completo: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-full">
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 text-artistfont cursor-default"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="sm:w-1/5 w-2/5">
            <p className="text-artistfont">
              Email: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-full">
              <input
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-artistfont py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="sm:w-1/5 w-2/5">
            <p className="text-artistfont">Nueva Contraseña:</p>
          </div>

          <div className="flex-1 relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default"
            />

            <span
              className="absolute right-2 top-3 text-[20px] text-primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
            </span>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <div className="sm:w-1/5 w-2/5">
            <p className="text-artistfont">Confirmar Nueva Contraseña:</p>
          </div>
          <div className="flex-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default text-artistfont"
            />
            <span
              className="absolute right-2 top-3 text-[20px] text-primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
            </span>
          </div>
        </div>
        <div className=" mb-2 w-full flex items-center justify-center">
          <button
            className="bg-primary text-[20px] font-newrocker mb-8 hover:bg-primary/70 flex items-center justify-center gap-x-1 border-primary border-[1px] px-2 py-3 rounded-md cursor-pointer mx-auto"
            type="submit"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default UProfile;
