import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  comment: Yup.string().required("Campo obligatorio").max(255),
  image: Yup.mixed().nullable(),
  rating: Yup.number().required("Campo obligatorio"),
});
