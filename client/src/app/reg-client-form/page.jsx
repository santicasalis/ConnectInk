"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ArtistRegistrationForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required").max(30),
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
      .max(30),
    firstName: Yup.string().required("Required").max(30),
    lastName: Yup.string().required("Required").max(30),
    mobile: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .required("Required")
      .max(30),

    address: Yup.string().required("Required").max(30),
    city: Yup.string().required("Required").max(30),
    postcode: Yup.string().required("Required").max(30),
    privacyPolicy: Yup.bool().oneOf(
      [true],
      "You must accept the privacy policy"
    ),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: "",
        mobile: "",
        address: "",
        city: "",
        postcode: "",
        privacyPolicy: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto">
          <Field
            type="email"
            name="email"
            placeholder="Email Address"
            className="p-2 mb-3 shadow-md"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />
          <Field
            type="password"
            name="password"
            placeholder="Password (6-15 characters, include numbers and symbols)"
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
            placeholder="Confirm Password"
            className="p-2 mb-3 shadow-md"
          />
          <ErrorMessage
            name="passwordConfirm"
            component="div"
            className="text-red-500 text-sm"
          />
          <Field
            type="text"
            name="firstName"
            placeholder="First Name"
            className="p-2 mb-3 shadow-md"
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-500 text-sm"
          />
          <Field
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="p-2 mb-3 shadow-md"
          />
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-red-500 text-sm"
          />
          <Field
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            className="p-2 mb-3 shadow-md"
            pattern="\d*"
          />

          <ErrorMessage
            name="mobile"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            type="text"
            name="shopName"
            placeholder="Shop Name"
            className="p-2 mb-3 shadow-md"
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
            className="p-2 mb-3 shadow-md"
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
            className="p-2 mb-3 shadow-md"
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
            className="p-2 mb-3 shadow-md"
          />
          <ErrorMessage
            name="postcode"
            component="div"
            className="text-red-500 text-sm"
          />
          <label className="flex items-center">
            <Field type="checkbox" name="privacyPolicy" className="mr-2" />I
            have read and agree to the Privacy Policy
          </label>
          <ErrorMessage
            name="privacyPolicy"
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
  );
};

export default ArtistRegistrationForm;
