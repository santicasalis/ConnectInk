"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { validationSchema } from "./validationSchema";
import { useState } from "react";
import ReactStars from "react-stars";
import { uploadImage } from "../../../../app/utils/uploadImage";

const Critica = () => {
  const [sent, setSent] = useState(false);

  return (
    <div>
      {sent ? (
        <p>Reseña enviada con exito</p>
      ) : (
        <Formik
          initialValues={{
            rating: 0,
            comment: "",
            image: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (values.image && typeof values.image === "object") {
                const imageUrl = await uploadImage(values.image);
                values.image = imageUrl;
              }
              console.log(values);
              setSent(true);
            } catch (error) {
              console.log(error);
              throw Error("Error en el formulario");
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
            <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto">
              <div>
                <label htmlFor="rating">¿Que calificaion le darías a la experiencia?</label>
                <Field name="rating">
                  {({ field, form }) => (
                    <ReactStars
                      count={5}
                      onChange={(newValue) =>
                        form.setFieldValue("rating", newValue)
                      }
                      size={24}
                      activeColor="#ffd700"
                      value={form.values.rating}
                    />
                  )}
                </Field>
                <ErrorMessage name="rating" component="div" />
              </div>
              <div className="info-artist mb-4">
                <div className="p-2 m-2">
                  <label htmlFor="size">
                    Deja tu opinion sobre la experiencia:
                  </label>
                  <Field
                    type="textarea"
                    name="comment"
                    placeholder="Opinion"
                    className="p-2 mb-3 shadow-md block w-full"
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="font-bold">
                  Si quieres, puedes dejar una foto del resultado!
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
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
              >
                Dejar reseña
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Critica;
