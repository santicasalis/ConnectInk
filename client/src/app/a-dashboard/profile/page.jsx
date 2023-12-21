"use client";

import { RiEdit2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import axios from "axios";
import {
  bringUserInformation,
  getUserById,
} from "../../../app/redux/features/user/userActions";

import { RiEyeLine, RiEyeOffLine, RiSave3Fill } from "react-icons/ri";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";

import { notifyError } from "../../../components/notifyError/NotifyError";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { getAllStyles } from "../../redux/features/styles/stylesActions";
import { validateInput } from "./validations";

const Profile = () => {
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState({});
  const user = useSelector((state) => state.user.logedInUser);
  const styles = useSelector((state) => state.styles.names);
  const [showPassword, setShowPassword] = useState(false);
  const imageLoader = ({ src }) => {
    return src;
  };
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(user.image);
  const [styleSelected, setStyleSelected] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "artist") {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    dispatch(getAllStyles());
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
    tattooStyles: user.tattooStyles,
    cbu: user.cbu,
  });
  const [errors, setErrors] = useState({});

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
      cbu: user.cbu,
    });
    setStyleSelected(user?.tattooStyles?.map((style) => style));
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialData[key]) {
        updatedFields[key] = formData[key];
      }
    });

    updatedFields.tattooStyles = styleSelected;

    if (formData.password && formData.password !== confirmPassword) {
      notifyError(new Error("Las contraseñas no coinciden"));
      return;
    }

    try {
      const auth = getAuth();
      const fireBaseUser = auth.currentUser;

      if (fireBaseUser && formData.password) {
        await updatePassword(fireBaseUser, formData.password);
        console.log("Contraseña actualizada con éxito en Firebase");
      } else if (!fireBaseUser) {
        console.log(error);
        notifyError(new Error("No hay usuario de Firebase autenticado"));
        return;
      }

      const dataToUpdate = { ...updatedFields, image: formData.image };

      const response = await axios.put(
        `http://localhost:3001/tattooArtists/${user.id}`,
        dataToUpdate
      );
      console.log(dataToUpdate);

      dispatch(getUserById(fireBaseUser.uid));
      setImage(null);

      if (response.status === 200) {
        dispatch(bringUserInformation(dataToUpdate));
        console.log("Datos actualizados con éxito");

        setFormData({ ...formData, password: "" });
        setConfirmPassword("");

        toast.success(`Cambios guardados con exito!`, {
          className: "toastSuccess",
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error al guardar cambios`, {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(validateInput({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleStyleChange = (styleName) => {
    const updatedStyles = styleSelected.includes(styleName)
      ? styleSelected.filter((style) => style !== styleName)
      : [...styleSelected, styleName];

    setStyleSelected(updatedStyles);
  };

  return (
    <div className="bg-secondary-900 p-8 rounded-xl w-full shadow-lg shadow-artist/50">
      <h1 className="text-4xl font-rocksalt"> Mi perfil</h1>

      <hr className="my-8 border-artist/30" />
      <form>
        <div className="flex items-center mb-6">
          <div className="w-1/4 ">
            <p>Foto de perfil: </p>
          </div>
          <div className="flex-1">
            <div className="relative mb-2 flex justify-between	items-center	">
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
          <div className="w-1/5">
            <p>
              Nombre Completo: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex flex-col   gap-4">
            <div className="w-full">
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default"
              />
            </div>
            <div>
              {" "}
              <p className="text-red-500">{errors?.fullName}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/5">
            <p>
              Email: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-full">
              <input
                name="email"
                type="text"
                readOnly
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/5">
            <p>
              Celular: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full">
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default"
              />
            </div>
            <div>
              {" "}
              <p className="text-red-500">{errors?.phone}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/5">
            <p>
              Dirección: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full">
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default"
              />
            </div>
            <div>
              {" "}
              <p className="text-red-500">{errors?.address}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/5">
            <p>
              Localidad: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full">
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default"
              />
            </div>
            <div>
              {" "}
              <p className="text-red-500">{errors?.location}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/5">
            <p>
              CBU (Código Bancario Único):{" "}
              <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex flex-col">
            <input
              name="cbu"
              type="text"
              value={formData.cbu}
              onChange={handleChange}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default"
            />
            <div>
              {" "}
              <p className="text-red-500">{errors?.cbu}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/5">
            <p>
              Estudio: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full">
              <input
                name="shopName"
                type="text"
                value={formData.shopName}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default"
              />
            </div>
            <div>
              {" "}
              <p className="text-red-500">{errors?.shopName}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/5">
            <p>Instagram:</p>
          </div>
          <div className="flex-1 flex flex-col">
            <input
              name="instagram"
              type="text"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default"
            />
            <div>
              {" "}
              <p className="text-red-500">{errors?.instagram}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/5">
            <p>Descripción:</p>
          </div>
          <div className="flex-1">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default resize-none"
              rows="4"
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/5">
            <p>
              Nueva Contraseña: <span className="text-red-500">*</span>
            </p>
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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-[22px] text-artist"
            >
              {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
            </span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/5">
            <p>
              Confirmar Nueva Contraseña:{" "}
              <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-100 cursor-default "
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-[22px] text-artist"
            >
              {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
            </span>
          </div>
        </div>

        <div className="flex mb-8">
          <div className="w-1/4">
            <label htmlFor="">
              Estilos actuales <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="bg-secondary-100 flex flex-wrap gap-x-2 rounded-lg w-full p-3">
            {user?.tattooStyles?.map((userStyle) => {
              return (
                <div className="flex gap-x-2 rounded-md border-[1px] border-artistfont p-2 text-artistfont">
                  {userStyle}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mb-8">
          <label
            className="text-2xl font-weight:800 text-artistfont flex items-center gap-4 px-4 py-1 justify-center mb-3 font-newrocker text-[25px]"
            htmlFor="style"
          >
            Selecciona tus estilos de Tatuaje:
          </label>
          <div className="flex flex-wrap w-3/4  p-6 rounded-lg  justify-center gap-4 mb-8">
            {styles?.map((style) => {
              const isSelected = styleSelected.includes(style.name);
              return (
                <label
                  className={`flex items-center gap-2 px-3 py-1 border rounded cursor-pointer ${
                    isSelected
                      ? "bg-artist text-black border-artist border-[1px]"
                      : "bg-transparent border-[1px] border-artist text-artist rounded-lg"
                  }`}
                  htmlFor={style.name}
                  key={style.name}
                  onClick={() => handleStyleChange(style.name)}
                >
                  {style.name}
                </label>
              );
            })}
          </div>
        </div>

        <button
          className="bg-artist text-[20px] font-newrocker mb-8 hover:bg-artist/70 flex items-center justify-center gap-x-1 border-artist text-artistfont/80 border-[1px] px-2 py-3 rounded-md cursor-pointer mx-auto"
          type="button"
          style={{
            cursor:
              Object.keys(errors).length === 0 ? "pointer" : "not-allowed",
          }}
          onClick={(e) => {
            if (Object.keys(errors).length === 0) {
              handleUpdate(e);
            } else {
              toast.error(`Debes completar los campos con errores`, {
                className: "toastError",
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
              });
            }
          }}
        >
          {" "}
          <RiSave3Fill className="text-[25px]" />
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default Profile;
