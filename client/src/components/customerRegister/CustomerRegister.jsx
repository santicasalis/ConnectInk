import React from "react";
import { uploadImage } from "@/app/utils/uploadImage";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  useField,
} from "formik";

import { auth } from "../../firebase";

import { validationSchemaClient } from "../customerRegister/validationSchemaCliente";
import { emailSignUp } from "../../app/utils/emailSignUp";
import axios from "axios";

const CustomerRegister = ({ userInformation }) => {
  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
      <div>
        <label className="checkbox-input">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: userInformation?.email || "",
          password: "",
          passwordConfirm: "",
          fullName: "",
          userName: userInformation?.userName || "",
          mobile: "",
          tokenId: userInformation?.tokenId || "",
          image: "",
        }}
        validationSchema={validationSchemaClient}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(userInformation);
          if (userInformation) {
            try {
              console.log(values.image);
              if (values.image && typeof values.image === "object") {
                const imageUrl = await uploadImage(values.image);
                values.image = imageUrl;
              } else {
                values.image = userInformation?.image;
              }
              const response = await axios.post(`${urlBase}/customers`);
            } catch (error) {
              console.error("Error during form submission", error);
            }
          } else {
            const tokenId = emailSignUp(values.email, values.password);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, setFieldValue, dirty, values }) => (
          <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto">
            <Field
              type="text"
              name="fullName"
              placeholder="Nombre completo"
              className="p-2 mb-3 shadow-md"
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
              className="p-2 mb-3 shadow-md"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
            <Field
              type="text"
              name="mobile"
              placeholder="Teléfono"
              className="p-2 mb-3 shadow-md"
              pattern="\d*"
            />

            <ErrorMessage
              name="mobile"
              component="div"
              className="text-red-500 text-sm"
            />
            <Field
              type="password"
              name="password"
              placeholder="Contraseña (incluir números, mayusuculas , minusculas y un caracter especial)"
              className="p-2 mb-3 shadow-md"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
            <Field
              type="password"
              name="passwordConfirm"
              placeholder="Confirmar contraseña"
              className="p-2 mb-3 shadow-md"
            />
            <ErrorMessage
              name="passwordConfirm"
              component="div"
              className="text-red-500 text-sm"
            />

            <div className="mb-4">
              <label htmlFor="image" className="font-bold">
                Profile Image
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
            <label className="flex items-center">
              <MyCheckbox name="acceptedTerms">
                I accept the terms and conditions
              </MyCheckbox>
            </label>
            <ErrorMessage
              name="acceptedTerms"
              component="div"
              className="text-red-500 text-sm"
            />
            <button
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
              className="p-2 mt-5 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomerRegister;
