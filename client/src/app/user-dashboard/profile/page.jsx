"use client";

import { RiEdit2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { bringUserInformation } from "../../../app/redux/features/user/userActions";
import axios from "axios";
import { getAuth, updatePassword } from "firebase/auth";
import { notifyError } from "../../../components/notifyError/NotifyError";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const UProfile = () => {
  const user = useSelector((state) => state.user.logedInUser);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [initialData, setInitialData] = useState({});

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
        formData
      );

      if (response.status === 200) {
        dispatch(bringUserInformation(formData));
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

  return (
    <div className="bg-secondary-100 p-8 rounded-xl w-full">
      <h1 className="text-4xl text-artistfont font-rocksalt"> Mi perfil</h1>
      <hr className="my-8 border-gray-500" />
      <form onSubmit={handleUpdate}>
        <div className="flex items-center mb-6">
          <div className="w-1/4 flex items-center">
            <div className=" mb-2   mx-auto">
              <Image
                src={user.image}
                loader={imageLoader}
                width={150}
                height={150}
                alt={`${user.fullName} profile pic`}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p className="text-artistfont">
              Nombre Completo: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-1/2">
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 text-artistfont cursor-default"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p className="text-artistfont">
              Email: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-1/2">
              <input
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-artistfont py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p className="text-artistfont">Nueva Contraseña:</p>
          </div>
          <div className="flex-1">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-[50%] py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
            </span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p className="text-artistfont">Confirmar Nueva Contraseña:</p>
          </div>
          <div className="flex-1">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[50%] py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default text-artistfont"
            />
          </div>
        </div>
        <div className=" mb-2 w-full flex items-center  mx-auto">
          <button
            className="mx-auto mt-6 border-[1px] border-primary/50 hover:border-primary w-[250px] rounded px-2 py-3 "
            type="submit"
          >
            {" "}
            GUARDAR CAMBIOS
          </button>
        </div>
      </form>
    </div>
  );
};

export default UProfile;
