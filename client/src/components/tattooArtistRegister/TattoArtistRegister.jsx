"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "../../app/redux/features/styles/stylesActions";
import { validationSchemaArtist } from "../../components/tattooArtistRegister/validationSchemaArtist";
import axios from "axios";
import { emailSignUp } from "../../app/utils/emailSignUp";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import {
  getUserById,
  getUserInformation,
} from "../../app/redux/features/user/userActions";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

import {
  RiMailLine,
  RiLock2Line,
  RiHome8Line,
  RiUserLine,
  RiPhoneFill,
  RiSpeakLine,
  RiMapPin2Fill,
  RiRoadMapLine,
  RiInstagramLine,
  RiLockLine,
  RiUpload2Fill,
  RiEyeLine,
  RiEyeOffLine,
  RiGoogleFill,
} from "react-icons/ri";

const TattoArtistRegister = () => {
  const styles = useSelector((state) => state.styles.names);
  const userInformation = useSelector((state) => state.user.fireBaseUser);
  const dispatch = useDispatch();
  const urlBase = "http://localhost:3001";
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [image, setImage] = useState(userInformation?.image || null);

  useEffect(() => {
    dispatch(getAllStyles());
    setLoaded(true);
  }, []);
  const imageLoader = ({ src }) => {
    return src;
  };

  return loaded ? (
    <div className="h-full">
      <Formik
        initialValues={{
          fullName: "",
          userName: userInformation?.userName ? true : false,
          email: userInformation.email || "",
          address: "",
          location: "",
          shopName: "",
          phone: userInformation?.phone || "",
          image: "",
          password: "",
          passwordConfirm: "",
          tattooStyle: [],
          tokenId: userInformation?.tokenId || "",
          description: "",
          instagram: "",
          cbu: "",
        }}
        validationSchema={validationSchemaArtist}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (!values.image) {
              values.image =
                userInformation?.image ||
                "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg";
            }

            if (!values.userName) {
              values.tokenId = await emailSignUp(values.email, values.password);
            }

            await axios.post(`${urlBase}/tattooArtists`, values);

            toast.success(`${values.fullName} se ha registrado existosamente`, {
              className: "toastSuccess",
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000,
              hideProgressBar: false,
            });
            await axios.post(`${urlBase}/nodemailer/welcomeArtist`, {
              email: values.email,
              name: values.fullName,
            });

            const userFireBase = auth.currentUser;
            const token = userFireBase.reloadUserInfo.localId;

            dispatch(getUserById(token));
            dispatch(
              getUserInformation({
                tokenId: userFireBase.uid,
                userName: userFireBase.displayName,
                image: userFireBase.photoURL,
                email: userFireBase.email,
                phoneNumber: userFireBase.phoneNumber,
              })
            );
            router.replace("/a-dashboard/home");
          } catch (error) {
            notifyError("Error during form submission", error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
          <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto h-full">
            <div className="info-artist mb-4">
              <div className="relative w-full">
                <RiUserLine className="absolute left-2 top-4 text-white z-30" />
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Nombre completo"
                  className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative w-full">
                <RiSpeakLine className="absolute left-2 top-4 text-white z-30" />
                <Field
                  type="textarea"
                  name="description"
                  placeholder="Descripcion de tu perfil"
                  className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative w-full">
                <RiMailLine className="absolute left-2 top-4 text-white z-30" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative w-full">
                <RiHome8Line className="absolute left-2 top-4 text-white z-30" />
                <Field
                  type="text"
                  name="shopName"
                  placeholder="Nombre de la tienda"
                  className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                />
                <ErrorMessage
                  name="shopName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative w-full">
                <RiMapPin2Fill className="absolute left-2 top-4 text-white z-30" />
                <Field
                  type="text"
                  name="address"
                  placeholder="Dirección"
                  className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative w-full">
                <RiRoadMapLine className="absolute left-2 top-4 text-white z-30" />
                <Field
                  type="text"
                  name="location"
                  placeholder="Ubicación"
                  className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative w-full">
                <RiInstagramLine className="absolute left-2 top-4 text-white z-30" />
                <Field
                  type="textarea"
                  name="instagram"
                  placeholder="Enlace a tu perfil de instagram"
                  className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                />
                <ErrorMessage
                  name="instagram"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative w-full">
                <RiPhoneFill className="absolute left-2 top-4 text-white z-30" />
                <Field
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                  pattern="\d*"
                />

                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative w-full">
                <RiBankLine className="absolute left-2 top-4 text-white z-30" />
                <Field
                  type="text"
                  name="cbu"
                  placeholder="CBU (Código Bancario Único)"
                  className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                />
                <ErrorMessage
                  name="cbu"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {!userInformation?.email && (
                <div>
                  <div className="relative w-full">
                    <RiLockLine className="absolute left-2 top-4 text-white z-30" />
                    <Field
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="relative w-full">
                    <RiLockLine className="absolute left-2 top-4 text-white z-30" />
                    <Field
                      type="password"
                      name="passwordConfirm"
                      placeholder="Confirme contraseña"
                      className="p-3 pl-7 mb-3 shadow-md bg-secondary-100 rounded-2xl relative w-full"
                    />
                    <ErrorMessage
                      name="passwordConfirm"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              )}

              <h3 className=" mb-3 font-bold font-newrocker text-[20px]">
                Estilos de tatuaje
              </h3>

              <FieldArray
                name="tattooStyle"
                render={(arrayHelpers) => (
                  <div className="flex flex-col items-center justify-center mb-8">
                    <label
                      className="text-lg font-weight:800 flex items-center gap-4 px-4 py-1 justify-center mb-6  text-[22px]"
                      htmlFor="style"
                    ></label>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                      {styles.map((style) => (
                        <label
                          className={`flex items-center gap-2 px-3 py-1 border font-bold rounded cursor-pointer ${
                            values.tattooStyle.includes(style.name)
                              ? "bg-primary/75 text-black border-primary border-[1px]"
                              : "bg-transparent border-[1px] border-primary text-primary rounded-lg"
                          }`}
                          htmlFor={style.name}
                          key={style.id}
                          onClick={() => {
                            if (values.tattooStyle.includes(style.name)) {
                              arrayHelpers.remove(
                                values.tattooStyle.indexOf(style.name)
                              );
                            } else {
                              arrayHelpers.push(style.name);
                            }
                          }}
                        >
                          {style.name}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="mb-4 flex flex-col">
              <label
                htmlFor="image"
                className="font-newrocker mb-6 text-[22px]"
              >
                Imagen de perfil:
              </label>
              <div className="flex items-center  gap-x-3">
                <CldUploadWidget
                  uploadPreset="cloudinary-upload-images-connectInk"
                  onUpload={(result) => {
                    values.image = result.info.secure_url;
                    setImage(result.info.secure_url);
                  }}
                >
                  {({ open }) => {
                    return (
                      <button
                        type="button"
                        className="border-[1px] px-4 py-2 h-[60px] text-[16px] cursor-pointer mt-3 rounded-md flex items-center hover:bg-primary/30 "
                        onClick={() => open()}
                      >
                        <RiUpload2Fill />
                        Subir imagen
                      </button>
                    );
                  }}
                </CldUploadWidget>
                <div className="flex flex-col">
                  {image && (
                    <Image
                      src={image}
                      loader={imageLoader}
                      unoptimized
                      alt="tattoo image"
                      height={120}
                      width={120}
                    />
                  )}
                  {image && (
                    <button
                      type="button"
                      onClick={() => {
                        setFieldValue("image", null);
                        setImage(null);
                      }}
                      className="bg-red-500 text-white p-2 rounded  text-[15px]"
                    >
                      Quitar Imagen
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
              className="p-2 mt-5 bg-primary text-white rounded hover:bg-primary disabled:bg-primary/30 w-full"
            >
              Registrarme
            </button>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <></>
  );
};

export default TattoArtistRegister;
