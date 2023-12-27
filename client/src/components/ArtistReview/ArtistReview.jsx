"use client";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import StarReviews from "../starreviews/StarReviews";

const ArtistReview = ({ comment, customerId, rating }) => {
  const user = useSelector((state) => state.user.logedInUser);
  const URL_BASE = "http://localhost:3001";
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    try {
      const getCustomer = async () => {
        const response = (
          await axios.get(`${URL_BASE}/customers/${customerId}`)
        ).data;
        setCustomer(response);
      };
      getCustomer();
    } catch (error) {
      console.log(error.messagge, "hay un error bb");
    }
  }, []);
  return (
    <div className="w-full flex lg:flex-row flex-col items-center justify-center">
      <div className="flex md:flex-row flex-col items-center justify-center mt-3 gap-2 mb-3 h-full">
        <div className="flex justify-center items-center gap-x-1">
          <img
            src={customer.image}
            className="m-3 w-20 h-20 object-cover rounded-full"
          />
          <p className="text-center md:text-[30px] text-[17px] leading-8 font-newrocker text-artistfont">
            {customer.fullName}
          </p>{" "}
        </div>
      </div>

      <div className="font-bolt text-artist text-center text-xl flex items-center justify-center lg:ml-8">
        <StarReviews value={1} rating={rating} />
        <StarReviews value={2} rating={rating} />
        <StarReviews value={3} rating={rating} />
        <StarReviews value={4} rating={rating} />
        <StarReviews value={5} rating={rating} />
        {rating != null ? (
          <p className="ml-2 text-[22px]">{rating.toFixed(1)}</p>
        ) : (
          <p className="ml-2 text-[22px]">0.0</p>
        )}
      </div>

      <div className="lg:w-[50%] w-full h-full flex flex-col justify-center items-center p-5">
        <h1 className="text-center text-[27px] font-rocksalt mt-2 mb-8">
          Comentario:
        </h1>
        <p className="text-center text-[17px] mt-2">{comment}</p>
      </div>
    </div>
  );
};

export default ArtistReview;
