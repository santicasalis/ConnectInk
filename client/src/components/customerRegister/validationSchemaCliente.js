import * as Yup from "yup";

export const validationSchemaClient = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .required("Campo requerido")
    .max(30),
  password: Yup.string().when("userName", {
    is: false,
    then: () =>
      Yup.string()
        .required("Campo requerido")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
          "Debe contener de 6 a 15 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        )
        .max(15),
  }),
  passwordConfirm: Yup.string().when("userName", {
    is: false,
    then: () =>
      Yup.string()
        .required("Campo requerido")
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
        .max(30),
  }),
  fullName: Yup.string().required("Campo requerido").max(30),

  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .nullable()
    .max(30),

  image: Yup.mixed().nullable(),

  acceptedTerms: Yup.boolean()
    .oneOf([true], "Debes aceptar la política de privacidad")
    .required("Campo requerido"),
});
