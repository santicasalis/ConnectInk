"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { validationSchema } from "./validationSchema";
import { useState } from "react";
import ReactStars from "react-stars";

import { uploadImage } from "../../../../utils/uploadImage";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

import Link from "next/link";

import { notifyError } from "../../../components/notifyError/NotifyError";


const Critica = ({params}) => {
  const [appointmentId, tattooArtistId] = params.data
  const [sent, setSent] = useState(false);
  const user = useSelector((state) => state.user.logedInUser)
  console.log(user)
  const router = useRouter()

  useEffect(() => {
    if(!user.userType){
      router.replace("/auth")
    } else if(user.userType !== "customer"){
      router.replace("/")
    }
  }, [])

  return (
    <div className="w-full h-full ">
      {sent ? (
          <div className="bg-secondary-900 h-[30%] mx-auto w-[30%]  ">
            <div className="flex flex-col items-center ">
            <p className="text-center text-[22px] font-rocksalt mt-10 ">Reseña enviada con exito </p>
            <FaCheckCircle className="text-primary text-[40px] mt-4"/>
            <Link href={"/user-dashboard"}>
            <button className="mt-8 border-[1px] border-primary rounded w-[30%] hover:bg-primary/50 transition-transform hover:scale-105">Volver al inicio</button>
            </Link>
            

            </div>
           
          </div>   
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
              const data = {
                ...values,
                customerId: user.id,
                appointmentId,
                tattooArtistId
              }
              console.log(data, "holiei")
              const response = await axios.post("http://localhost:3001/reviews", data)
              console.log(response)
              setSent(true);
            } catch (error) {
              notifyError(error);
              throw Error("Error en el formulario");
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
            <Form className="flex flex-col  p-5 max-w-xl mx-auto h-[50%] bg-secondary-900 rounded shadow-md shadow-primary mt-8">
              <div>
                <label className="font-rocksalt text-[22px] text-artistfont text-center mt-6" htmlFor="rating">¿Que calificaion le darías a la experiencia?</label>
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
                    Deja tu opinion sobre la experiencia:
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

              <div className="mb-4">
                <label htmlFor="image" className="font-bold m-6 text-[17px] text-artistfont">
                  Si quieres, puedes dejar una foto del resultado!
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  className="ml-6 p-2 mb-3 shadow-md block w-full text-artistfont"
                />
                {values.image && (
                  <button
                    type="button"
                    onClick={() => setFieldValue("image", null)}
                    className="bg-red-500 text-artistfont p-2 rounded ml-8"
                  >
                    Borrar Imagen
                  </button>
                )}
              </div>
              <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className="border-[1px] border-primary rounded w-[35%] hover:bg-primary/50 transition-transform hover:scale-105 "
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
