import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  size: Yup.string().required("Campo obligatorio").max(30),
  image: Yup.mixed().nullable(),
  bodyPlace: Yup.string().required("Campo obligatorio").max(30),
  description: Yup.string().required("Campo obligatorio").max(250),
  dateAndTime: Yup.date().required("Campo obligatorio"),
  // possible: Yup.boolean().oneOf([true]).required("Required"),
});
