"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ArtistRegistrationForm = () => {
  const validationSchema = Yup.object().shape({
    shopName: Yup.string().required("Required").max(30),
    address: Yup.string().required("Required").max(30),
    city: Yup.string().required("Required").max(30),
    postcode: Yup.string().required("Required").max(30),
    instagram: Yup.string().max(30),
    tattooStyles: Yup.string().required("Required"),
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
        tattooStyles: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto">
          <div className="info-artist">
            <Field
              as="select"
              name="tattooStyles"
              className="p-2 mb-3 shadow-md"
            >
              <option value="">Select Tattoo Style</option>
              <option value="traditional">Traditional</option>
              <option value="trash-polka">Trash Polka</option>
              <option value="tribal">Tribal</option>
              <option value="gotico">Gothic</option>
              <option value="quenoexiste">Quenoexiste</option>
            </Field>
            <ErrorMessage
              name="tattooStyles"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="artist-services">
            <h3 className="text-lg mb-3">Price</h3>
            <div className="mb-3">
              <label>Small: $</label>
            </div>
            <div className="mb-3">
              <label>Medium: $$</label>
            </div>
            <div className="mb-3">
              <label>Large: $$$</label>
            </div>
          </div>

          <Field
            type="password"
            name="password"
            placeholder="Password"
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
