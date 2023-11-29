import React, { useEffect } from "react";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "@/app/redux/features/styles/stylesActions";

import { auth } from "../../firebase";
import { uploadImage } from "@/app/utils/uploadImage";
import { validationSchemaArtist } from "../../components/tattooArtistRegister/validationSchemaArtist";
import { emailSignUp } from "../../app/utils/emailSignUp";

const TattoArtistRegister = ({ userInformation }) => {
  const styles = useSelector((state) => state.styles.names);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStyles());
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          fullName: "",
          email: userInformation?.email || "",
          address: "",
          location: "",
          shopName: "",
          image: null,
          password: "",
          passwordConfirm: "",
          tattooStyles: [],
          tokenId: userInformation?.tokenId || "",
        }}
        validationSchema={validationSchemaArtist}
        onSubmit={async (values, { setSubmitting }) => {
          if (userInformation) {
            try {
              if (values.image && typeof values.image === "object") {
                const imageUrl = await uploadImage(values.profileImage);
                values.profileImage = imageUrl;
              } else {
                values.image = userInformation?.image;
              }
              const response = await axios.post(
                `${urlBase}/tattooArtists`,
                info
              );
            } catch (error) {
              console.error("Error during form submission", error);
            }
          } else {
            const tokenId = emailSignUp(values.email, values.password);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
          <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto">
            <div className="info-artist mb-4">
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
                name="shopName"
                placeholder="Shop Name"
                className="p-2 mb-3 shadow-md block w-full"
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
                className="p-2 mb-3 shadow-md block w-full"
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
                className="p-2 mb-3 shadow-md block w-full"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm"
              />

              <h3 className="text-lg mb-3 font-bold">Tattoo Styles</h3>
              <FieldArray
                name="tattooStyles"
                render={(arrayHelpers) => (
                  <div>
                    {styles.map((style) => (
                      <label key={style.id} className="block">
                        <Field
                          name="tattooStyles"
                          type="checkbox"
                          value={style.name}
                          checked={values.tattooStyles.includes(style.name)}
                          onChange={(e) => {
                            if (e.target.checked) arrayHelpers.push(style.name);
                            else
                              arrayHelpers.remove(
                                values.tattooStyles.indexOf(style.name)
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
                name="tattooStyles"
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

            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 mb-3 shadow-md block w-full"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              className="p-2 mb-3 shadow-md block w-full"
            />
            <ErrorMessage
              name="passwordConfirm"
              component="div"
              className="text-red-500 text-sm"
            />

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
