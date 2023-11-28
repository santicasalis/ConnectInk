import React, { useEffect } from "react";
import { useState } from "react";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "@/app/redux/features/styles/stylesActions";

const TattoArtistRegister = ({ userInformation }) => {
  const styles = useSelector((state) => state.styles.names);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStyles());
  }, []);

  const validationSchemaArtist = Yup.object().shape({
    shopName: Yup.string().required("Required").max(30),
    address: Yup.string().required("Required").max(30),
    city: Yup.string().required("Required").max(30),
    postcode: Yup.string().required("Required").max(30),
    // instagram: Yup.string().max(30),
    tattooStyles: Yup.array()
      .of(Yup.string())
      .required("At least one style is required"),
    // // smallPrice: Yup.number().required("Required"),
    // // mediumPrice: Yup.number().required("Required"),
    // largePrice: Yup.number().required("Required"),
    bio: Yup.string().max(500, "Max 500 characters"),
    image: Yup.mixed().required("A profile image is required"),

    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
        "Must contain 6-15 characters, one uppercase, one lowercase, one number and one special character"
      )
      .max(15),
    passwordConfirm: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .max(15),
  });

  return (
    <div>
      <Formik
        initialValues={{
          shopName: "",
          name: "",
          address: "",
          city: "",
          email: userInformation?.email || "",
          postcode: "",
          instagram: "",
          tattooStyles: [],
          smallPrice: "",
          mediumPrice: "",
          largePrice: "",
          bio: "",
          image: null,
          password: "",
          passwordConfirm: "",
          tokenId: userInformation?.tokenId || "",
        }}
        validationSchema={validationSchemaArtist}
        onSubmit={async (values, { setSubmitting }) => {
          if (userInformation) {
            try {
              if (typeof values.profileImage === "object") {
                const imageUrl = await uploadImage(values.profileImage);
                values.profileImage = imageUrl;
              }
              // const response = await axios.post(`${urlBase}/tattooArtists`, info);
            } catch (error) {
              console.error("Error during form submission", error);
            }
          } else {
            const tokenId = emailLogIn(values.email, values.password);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
          <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto">
            <div className="info-artist mb-4">
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
                placeholder="Address"
                className="p-2 mb-3 shadow-md block w-full"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="text"
                name="city"
                placeholder="City"
                className="p-2 mb-3 shadow-md block w-full"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="text"
                name="postcode"
                placeholder="Postcode"
                className="p-2 mb-3 shadow-md block w-full"
              />
              <ErrorMessage
                name="postcode"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="text"
                name="instagram"
                placeholder="Instagram"
                className="p-2 mb-3 shadow-md block w-full"
              />
              <ErrorMessage
                name="instagram"
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

            <div className="artist-services mb-4">
              <h3 className="text-lg mb-3 font-bold">Price</h3>
              <Field
                type="number"
                name="smallPrice"
                placeholder="Small Tattoo Price"
                className="p-2 mb-3 shadow-md block w-full"
              />
              <Field
                type="number"
                name="mediumPrice"
                placeholder="Medium Tattoo Price"
                className="p-2 mb-3 shadow-md block w-full"
              />
              <Field
                type="number"
                name="largePrice"
                placeholder="Large Tattoo Price"
                className="p-2 mb-3 shadow-md block w-full"
              />
            </div>

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

            <Field
              as="textarea"
              name="bio"
              placeholder="Bio (max 500 characters)"
              className="p-2 mb-3 shadow-md block w-full"
              maxLength="500"
            />
            <ErrorMessage
              name="bio"
              component="div"
              className="text-red-500 text-sm"
            />

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
