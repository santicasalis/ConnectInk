"use client";

import { RiEdit2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { uploadImage } from "../../utils/uploadImage";
import axios from "axios";
import {
  bringUserInformation,
  getUserById,
} from "../../../app/redux/features/user/userActions";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { getAuth, updatePassword } from "firebase/auth";
import { notifyError } from "../../../components/notifyError/NotifyError";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { getAllStyles } from "../../redux/features/styles/stylesActions";

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
      const firebaseUser = auth.currentUser;

      if (firebaseUser && formData.password) {
        await updatePassword(firebaseUser, formData.password);
        console.log("Contraseña actualizada con éxito en Firebase");
      } else if (!firebaseUser) {
        notifyError(new Error("No hay usuario de Firebase autenticado"));
        return;
      }

      const dataToUpdate = { ...updatedFields, image: formData.image };

      const response = await axios.put(
        `http://localhost:3001/tattooArtists/${user.id}`,
        dataToUpdate
      );

      dispatch(getUserById(firebaseUser.tokenId));

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
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      try {
        const imageUrl = await uploadImage(selectedFile);

        setFormData({ ...formData, image: imageUrl });
      } catch (error) {
        console.error("Error al subir la imagen:", error);

        notifyError("Error al subir la imagen");
      }
    }
  };

  const handleStyleChange = (styleName) => {
    const updatedStyles = styleSelected.includes(styleName)
      ? styleSelected.filter((style) => style !== styleName)
      : [...styleSelected, styleName];

    setStyleSelected(updatedStyles);
  };

  return (
    <div className="bg-secondary-100 p-8 rounded-xl w-full">
      <h1 className="text-4xl font-rocksalt"> Mi perfil</h1>
      <hr className="my-8 border-gray-500" />
      <form onSubmit={handleUpdate}>
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <div className="relative mb-2">
              <input
                type="file"
                id="avatar"
                className="hidden"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
              />

              {user.image && (
                <div>
                  <Image
                    unoptimized
                    src={imagePreview}
                    loader={imageLoader}
                    width={80}
                    height={80}
                    alt={`${user.fullName} profile pic`}
                  />
                </div>
              )}

              <label
                htmlFor="avatar"
                className="absolute bg-secondary-900 p-2 left-24 -top-2 rounded-full cursor-pointer hover:bg-secondary-100"
              >
                <RiEdit2Line />
              </label>
            </div>
            <p className="text-gray-500 text-sm"></p>
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
              Celular: <span className="text-red-500">*</span>
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
              Dirección: <span className="text-red-500">*</span>
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
              Localidad: <span className="text-red-500">*</span>
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
                name="Estudio"
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
              {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
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
              {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="">Estilos actuales</label>
          {user?.tattooStyles?.map((userStyle) => {
            return <div>{userStyle}</div>;
          })}
        </div>

        <div className="flex flex-col items-center justify-center mb-8">
          <label
            className="text-2xl font-weight:800 text-artistfont flex items-center gap-4 px-4 py-1 justify-center mb-6 font-newrocker text-[22px]"
            htmlFor="style"
          >
            Estilos de Tatuaje:
          </label>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {styles?.map((style) => {
              const isSelected = styleSelected.includes(style.name);
              return (
                <label
                  className={`flex items-center gap-2 px-3 py-1 border rounded cursor-pointer ${
                    isSelected
                      ? "bg-primary/75 text-black border-primary border-[1px]"
                      : "bg-transparent border-[1px] border-primary text-primary rounded-lg"
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
          className="hover:bg-artist font-rocksalt  flex items-center justify-center gap-1 border-artist text-gray-300 border-[1px] px-2 py-3 rounded-md cursor-pointer mx-auto"
          type="submit"
        >
          {" "}
          GUARDAR CAMBIOS
        </button>
      </form>
    </div>
  );
};

export default Profile;
