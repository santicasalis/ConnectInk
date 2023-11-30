import * as Yup from "yup";

export const validationSchemaArtist = Yup.object().shape({
  shopName: Yup.string().required("Required").max(30),
  fullName: Yup.string().required("Required").max(30),
  address: Yup.string().required("Required").max(30),
  location: Yup.string().required("Required").max(30),

  tattooStyle: Yup.array()
    .of(Yup.string())
    .required("At least one style is required"),

  // image: Yup.mixed().required("A profile image is required"),

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
