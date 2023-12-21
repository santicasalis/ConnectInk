import * as Yup from "yup";

export const validationSchemaArtist = Yup.object().shape({
  shopName: Yup.string().required("Campo requerido").max(30),
  fullName: Yup.string().required("Campo requerido").max(30),
  address: Yup.string().required("Campo requerido").max(30),
  location: Yup.string().required("Campo requerido").max(30),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .nullable()
    .max(30),
  tattooStyle: Yup.array()
    .of(Yup.string())
    .required("Debes seleccionar al menos un estilo"),

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

  cbu: Yup.string()
    .required(
      "Es necesario completar el CBU para recibir transferencias de dinero"
    )
    .matches(/^[0-9]+$/, "El CBU solo debe contener números")
    .length(22, "El CBU debe tener 22 dígitos"),
});
