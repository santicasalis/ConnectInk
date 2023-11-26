"use client";


import React from "react";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

import { uploadImage } from "../../utils/uploadImage";


import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";


const ArtistRegistrationForm = () => {
  //hardcodeado por el momento
  const tattooStyleOptions = [
    "Traditional",
    "Trash Polka",
    "Tribal",
    "Gothic",
    "Quenoexiste",
  ];

  const validationSchema = Yup.object().shape({
    shopName: Yup.string().required("Required").max(30),
    address: Yup.string().required("Required").max(30),
    city: Yup.string().required("Required").max(30),
    postcode: Yup.string().required("Required").max(30),
    instagram: Yup.string().max(30),
    tattooStyles: Yup.array()
      .of(Yup.string())
      .required("At least one style is required"),
    smallPrice: Yup.number().required("Required"),
    mediumPrice: Yup.number().required("Required"),
    largePrice: Yup.number().required("Required"),
    bio: Yup.string().max(500, "Max 500 characters"),
    profileImage: Yup.mixed().required("A profile image is required"),

    // password: Yup.string()
    //   .required("Required")
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
    //     "Must contain 6-15 characters, one uppercase, one lowercase, one number and one special character"
    //   )
    //   .max(15),
    // passwordConfirm: Yup.string()
    //   .required("Required")
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .max(15),

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
    <Formik
      initialValues={{
        shopName: "",
        address: "",
        city: "",
        postcode: "",
        instagram: "",
        tattooStyles: [],
        smallPrice: "",
        mediumPrice: "",
        largePrice: "",
        bio: "",
        profileImage: null,
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={validationSchema}

      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (values.profileImage) {
            const imageUrl = await uploadImage(values.profileImage);
            values.profileImage = imageUrl;
          }
        } catch (error) {
          console.error("Error during form submission", error);
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
                  {tattooStyleOptions.map((style) => (
                    <label key={style} className="block">
                      <Field
                        name="tattooStyles"
                        type="checkbox"
                        value={style}
                        checked={values.tattooStyles.includes(style)}
                        onChange={(e) => {
                          if (e.target.checked) arrayHelpers.push(style);
                          else
                            arrayHelpers.remove(
                              values.tattooStyles.indexOf(style)
                            );
                        }}
                      />
                      {style}
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
            <label htmlFor="profileImage" className="font-bold">
              Profile Image
            </label>
            <input
              type="file"
              name="profileImage"
              onChange={(event) => {
                setFieldValue("profileImage", event.currentTarget.files[0]);
              }}
              className="p-2 mb-3 shadow-md block w-full"
            />
            {values.profileImage && (
              <button
                type="button"
                onClick={() => setFieldValue("profileImage", null)}
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
  );
};

export default ArtistRegistrationForm;

