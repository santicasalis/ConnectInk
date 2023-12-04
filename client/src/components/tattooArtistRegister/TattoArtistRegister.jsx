import React, { useEffect, useState } from "react";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "@/app/redux/features/styles/stylesActions";

import { uploadImage } from "@/app/utils/uploadImage";
import { validationSchemaArtist } from "../../components/tattooArtistRegister/validationSchemaArtist";

import axios from "axios";

import { emailSignUp } from "../../app/utils/emailSignUp";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { getUserById } from "@/app/redux/features/user/userActions";

const TattoArtistRegister = () => {
  const styles = useSelector((state) => state.styles.names);
  const userInformation = useSelector((state) => state.user.fireBaseUser);
  const dispatch = useDispatch();
  const urlBase = "http://localhost:3001";
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllStyles());
  }, []);

  return (
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
        }}
        validationSchema={validationSchemaArtist}
        onSubmit={async (values, { setSubmitting }) => {
          if (userInformation) {
            try {
              if (values.image && typeof values.image === "object") {
                const imageUrl = await uploadImage(values.image);
                values.image = imageUrl;
              } else {
                values.image =
                  userInformation?.image ||
                  "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg";
              }

              if (!values.userName) {
                values.tokenId = await emailSignUp(
                  values.email,
                  values.password
                );
              }

              await axios.post(`${urlBase}/tattooArtists`, values);

              toast.success(
                `${values.fullName} se ha registrado existosamente`,
                {
                  className: "toastSuccess",
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 3000,
                  hideProgressBar: true,
                }
              );
              await axios.post(`${urlBase}/nodemailer/welcome`, {
                email: values.email,
                name: values.name,
              });
              dispatch(getUserById(values.tokenId));
              router.replace("/a-dashboard/home");
            } catch (error) {
              console.error("Error during form submission", error);
            }
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
          <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto h-full">
            <div className="info-artist mb-4">
              <Field
                type="text"
                name="fullName"
                placeholder="Nombre completo"
                className="p-2 mb-3 shadow-md  w-full bg-secondary-100 rounded-2xl"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="p-2 mb-3 shadow-md  w-full bg-secondary-100 rounded-2xl"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
              <Field
                type="text"
                name="shopName"
                placeholder="Shop Name"
                className="p-2 mb-3 shadow-md w-full bg-secondary-100 rounded-2xl"
              />
              <ErrorMessage
                name="shopName"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="text"
                name="address"
                placeholder="Dirección"
                className="p-2 mb-3 shadow-md  w-full bg-secondary-100 rounded-2xl"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="text"
                name="location"
                placeholder="Ubicación"
                className="p-2 mb-3 shadow-md  w-full bg-secondary-100 rounded-2xl"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm"
              />

              <h3 className="text-lg mb-3 font-bold">Tattoo Styles</h3>
              <FieldArray
                name="tattooStyle"
                render={(arrayHelpers) => (
                  <div>
                    {styles.map((style) => (
                      <label key={style.id} className="block">
                        <Field
                          name="tattooStyles"
                          type="checkbox"
                          value={style.name}
                          checked={values.tattooStyle.includes(style.name)}
                          onChange={(e) => {
                            if (e.target.checked) arrayHelpers.push(style.name);
                            else
                              arrayHelpers.remove(
                                values.tattooStyle.indexOf(style.name)
                              );
                          }}
                        />
                        {style.name}
                      </label>
                    ))}
                  </div>
                )}
              />
              <ErrorMessage
                name="tattooStyle"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="font-bold">
                Imagen de perfil
              </label>
              <input
                type="file"
                name="image"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                className="p-2 mb-3 shadow-md block w-full"
              />
              {values.image && (
                <button
                  type="button"
                  onClick={() => setFieldValue("image", null)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete Image
                </button>
              )}
            </div>

            {!userInformation?.email && (
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="p-2 mb-3 shadow-md block w-full bg-secondary-100 rounded-2xl"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirme contraseña"
                  className="p-2 mb-3 shadow-md block w-full bg-secondary-100 rounded-2xl"
                />
                <ErrorMessage
                  name="passwordConfirm"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
              className="p-2 mt-5 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 w-full"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TattoArtistRegister;
