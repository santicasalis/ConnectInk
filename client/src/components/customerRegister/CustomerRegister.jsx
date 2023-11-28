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

import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";

const CustomerRegister = ({ userInformation }) => {
  const validationSchemaClient = Yup.object().shape({
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
    fullName: Yup.string().required("Required").max(30),

    mobile: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .nullable()
      .max(30),

    image: Yup.mixed().nullable(),

    privacyPolicy: Yup.boolean().oneOf(
      ['"on"'],
      "You must accept the privacy policy"
    ),
  });
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
  const emailSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log(user);
      return user.uid;
    } catch (createUserError) {
      const errorCode = createUserError.code;
      const errorMessage = createUserError.message;

      console.error(
        `Error al crear un nuevo usuario: ${errorCode} - ${errorMessage}`
      );
    }
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
              //const response = await axios.post(
              //`${urlBase}/customers`,
              //</div> values
              //);
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
