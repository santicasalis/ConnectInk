"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { validationSchema } from "./validationSchema";
import { useState } from "react";
import ReactStars from "react-stars";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

import Link from "next/link";

import { notifyError } from "../../../../../components/notifyError/NotifyError";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const Critica = ({ params }) => {
  const [appointmentId, tattooArtistId] = params.data;
  const [sent, setSent] = useState(false);
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();
  const [image, setImage] = useState(null);

  const imageLoader = ({ src }) => {
    return src;
  };

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "customer") {
      router.replace("/");
    }
  }, []);

  return (
    <div className="w-full h-full ">
      {sent ? (
        <div className="bg-secondary-900 h-[30%] mx-auto w-[30%]  ">
          <div className="flex flex-col items-center ">
            <p className="text-center text-[22px] font-rocksalt mt-10 ">
              Reseña enviada con exito{" "}
            </p>
            <FaCheckCircle className="text-primary text-[40px] mt-4" />
            <Link href={"/user-dashboard"}>
              <button className="mt-8 border-[1px] border-primary rounded w-[175px] hover:bg-primary/50 transition-transform hover:scale-105">
                Volver al inicio
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            rating: 0,
            comment: "",
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const data = {
                ...values,
                customerId: user.id,
                appointmentId,
                tattooArtistId,
              };
              const response = await axios.post(
                "http://localhost:3001/reviews",
                data
              );
              setSent(true);
            } catch (error) {
              notifyError(error);
              throw Error("Error en el formulario");
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
            <Form className="flex flex-col  p-5 max-w-xl mx-auto h-auto bg-secondary-900 rounded shadow-primary shadow-lg mt-8">
              <div>
                <div className="flex item-center justify-center">
                  <label
                    className="font-rocksalt text-[22px] text-artistfont text-center mt-6 leading-9"
                    htmlFor="rating"
                  >
                    ¿Que valoración le darías a la experiencia?
                  </label>
                </div>
                <Field name="rating">
                  {({ field, form }) => (
                    <div className="flex items-center justify-center">
                      <ReactStars
                        count={5}
                        onChange={(newValue) =>
                          form.setFieldValue("rating", newValue)
                        }
                        size={24}
                        activeColor="#ffd700"
                        value={form.values.rating}
                        className="mt-4"
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage name="rating" component="div" />
              </div>
              <div className="info-artist mb-4">
                <div className=" m-6">
                  <label className="text-[17px] text-artistfont" htmlFor="size">
                    Deja tu opinión sobre la experiencia:
                  </label>
                  <Field
                    type="textarea"
                    name="comment"
                    placeholder="Opinion"
                    className="p-2 mt-2 mb-3 shadow-md block w-full bg-secondary-100 rounded"
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <label
                htmlFor="image"
                className="font-bold m-2 text-[17px] text-artistfont ml-6"
              >
                Si quieres, puedes dejar una foto del resultado:
              </label>
              <div className="flex items-center justify-center gap-[20px] items-center mb-4">
                <CldUploadWidget
                  uploadPreset="cloudinary-upload-images-connectInk"
                  onUpload={(result) => {
                    values.image = result.info.secure_url;
                    setImage(result.info.secure_url);
                  }}
                >
                  {({ open }) => {
                    return (
                      <div className="text-center ">
                        <button
                          type="button"
                          className="border-[1px] p-2 w-[100%] text-[15px] cursor-pointer mt-3 rounded-md flex items-center hover:bg-primary/30 hover:font-bold"
                          onClick={() => open()}
                        >
                          Cargar
                        </button>
                      </div>
                    );
                  }}
                </CldUploadWidget>
                {image && (
                  <Image
                    src={image}
                    loader={imageLoader}
                    unoptimized
                    alt="tattoo image"
                    height={100}
                    width={100}
                  />
                )}
                {image && (
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue("image", null);
                      setImage(null);
                    }}
                    className="bg-red-500 text-white p-2 rounded w-[20%] text-[15px] mt-3 "
                  >
                    Delete Image
                  </button>
                )}
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className="border-[1px] border-primary text-primary hover:bg-primary hover:text-black font-bold py-2 px-4 rounded-lg text-[20px] "
                >
                  Dejar reseña
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Critica;
