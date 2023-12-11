"use client";

import { RiEdit2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { bringUserInformation } from "@/app/redux/features/user/userActions";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { getAuth, updatePassword } from "firebase/auth";
import { notifyError } from "@/components/notifyError/NotifyError";

const Profile = () => {
  const dispatch = useDispatch();

  const [initialData, setInitialData] = useState({});

  const user = useSelector((state) => state.user.logedInUser)
  const [showPassword, setShowPassword] = useState(false);
  const imageLoader = ({src}) => {
    return src
  }
  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "artist") {
      router.replace("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    location: user.location,
    shopName: user.shopName,
    image: user.image,
    instagram: user.instagram,
    description: user.description,
    password: user.password,
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setInitialData({ ...user });
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      location: user.location,
      shopName: user.shopName,
      image: user.image,
      instagram: user.instagram,
      description: user.description,
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
      notifyError(new Error("Las contraseñas no coinciden"));
      return;
    }

    try {
      const auth = getAuth();
      const firebaseUser = auth.currentUser;

      if (firebaseUser) {
        await updatePassword(firebaseUser, formData.password);
        console.log("Contraseña actualizada con éxito en Firebase");
      } else {
        notifyError(new Error("No hay usuario de Firebase autenticado"));
        return;
      }

      const response = await axios.put(
        `http://localhost:3001/tattooArtists/${user.id}`,
        formData
      );

      if (response.status === 200) {
        dispatch(bringUserInformation(formData));
        console.log("Datos actualizados con éxito");
        setFormData({ ...formData, password: "" });
        setConfirmPassword("");
      }
    } catch (error) {
      notifyError(error);
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-secondary-100 p-8 rounded-xl w-full">
      <h1 className="text-4xl"> Mi perfil</h1>
      <hr className="my-8 border-gray-500" />
      <form onSubmit={handleUpdate}>
        <div className="flex items-center mb-6">
          <div className="w-1/4">
            <p>Foto de Pefil:</p>
          </div>
          <div className="flex-1">
            <div className="relative mb-2">
              <Image
                unoptimized
                src={user.image}
                loader={imageLoader}
                width={80}
                height={80}
                alt={`${user.fullName} profile pic`}
              />
              <label
                htmlFor="avatar"
                className="absolute bg-secondary-900 p-2 left-24 -top-2 rounded-full cursor-pointer hover:bg-secondary-100"
              >
                <RiEdit2Line />
              </label>
              <input type="file" id="avatar" className="hidden" />
            </div>
            <p className="text-gray-500 text-sm">
              Extensiones permitidas: png, jpg, jpeg
            </p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>
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
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>
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
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>
              Phone: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-full">
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>
              Address: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-full">
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>
              Location: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-full">
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>
              Shop Name: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-full">
              <input
                name="shopName"
                type="text"
                value={formData.shopName}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>Instagram:</p>
          </div>
          <div className="flex-1">
            <input
              name="instagram"
              type="text"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>Descripción:</p>
          </div>
          <div className="flex-1">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
              rows="4"
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>Nueva Contraseña:</p>
          </div>
          <div className="flex-1 relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>Confirmar Nueva Contraseña:</p>
          </div>
          <div className="flex-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>
        </div>
        <button className=" w-[250px] hover:scale-105 transition-transform border-[1px] border-artist/60 hover:border-artist hover:bg-artist/60  rounded" type="submit"> GUARDAR CAMBIOS</button>
      </form>
    </div>
  );
};

export default Profile;
