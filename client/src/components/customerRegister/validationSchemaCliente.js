import * as Yup from "yup";

export const validationSchemaClient = Yup.object().shape({
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

  acceptedTerms: Yup.boolean()
    .oneOf([true], "You must accept the privacy policy")
    .required("Required"),
});
