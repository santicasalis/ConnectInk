"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { RiEdit2Line } from "react-icons/ri";

const validationSchema = Yup.object().shape({
  phone: Yup.string().matches(
    /^[0-9]+$/,
    "El teléfono debe contener solo números"
  ),
});

const Edit = () => {
  const [artistData, setArtistData] = useState({
    name: "Javier",
    lastName: "Milei",
    email: "gatito_mimoso@gmail.com",
    phone: "5491164216546",
    address: "AAA, Av. Maipú 2001, B1636 Olivos, Provincia de Buenos Aires",
    location: "Argentina",
    shopName: "Tattoos La casta",
    profileImage:
      "https://elcomercio.pe/resizer/Nk5gbJwG_w5n5tk9fd-Fu_RaJS8=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/UNWTCT67INFF7BCND5UVRFQYIQ.webp",
  });

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setArtistData({
        ...artistData,
        profileImage: event.target.files[0],
      });
    }
  };

  return (
    <div className="bg-secondary-100 p-8 rounded-xl w-full">
      <h1 className="text-4xl">Edit Profile</h1>
      <hr className="my-8 border-gray-500" />
      <Formik
        initialValues={artistData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setArtistData(values);
          setSubmitting(false);
          console.log("Updated Data", values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="flex items-center mb-6">
              <div className="w-1/4">
                <p>Foto de Perfil:</p>
              </div>
              <div className="flex-1">
                <div className="relative mb-2">
                  <img
                    className="w-28 h-28 object-cover rounded-lg"
                    src={
                      artistData.profileImage instanceof File
                        ? URL.createObjectURL(artistData.profileImage)
                        : artistData.profileImage
                    }
                    alt="Profile"
                  />
                  <label
                    htmlFor="avatar"
                    className="absolute bg-secondary-900 p-2 left-24 -top-2 rounded-full cursor-pointer hover:bg-secondary-100"
                  >
                    <RiEdit2Line />
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    onChange={(event) => {
                      handleImageChange(event);
                      setFieldValue(
                        "profileImage",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </div>
                <p className="text-gray-500 text-sm">
                  Extensiones permitidas: png, jpg, jpeg
                </p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="w-1/4">
                <p>
                  Nombres Completos: <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="flex-1 flex items-center gap-4">
                <div className="w-full">
                  <Field
                    name="name"
                    type="text"
                    className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900"
                  />
                </div>
                <div className="w-full">
                  <Field
                    name="lastName"
                    type="text"
                    className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900"
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
              <div className="w-full">
                <Field
                  name="email"
                  type="email"
                  className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900"
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="w-1/4">
                <p>
                  Teléfono: <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="w-full">
                <Field
                  name="phone"
                  type="text"
                  className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900"
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="w-1/4">
                <p>
                  Dirección: <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="w-full">
                <Field
                  name="address"
                  type="text"
                  className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900"
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="w-1/4">
                <p>
                  Ubicación: <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="w-full">
                <Field
                  name="location"
                  type="text"
                  className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900"
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="w-1/4">
                <p>
                  Nombre de la Tienda: <span className="text-red-500">*</span>
                </p>
              </div>
              <div className="w-full">
                <Field
                  name="shopName"
                  type="text"
                  className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Submit Info
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Edit;
