"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import ArtistReview from "../../../components/ArtistReview/ArtistReview";

const reviews = () => {
  const user = useSelector((state) => state.user.logedInUser);
  console.log(user, "revev");

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "artist") {
      router.replace("/");
    }
  }, []);

  useEffect(() => {}, [user]);

  return (
    <div className=" w-full h-full">
      <h1 className=" text-center font-rocksalt text-artistfont text-[28px]">
        Mis Reseñas
      </h1>
      <div className="w-full h-full">
        {user.reviews && user.reviews.length > 0 ? (
          user.reviews?.map((rev) => {
            return (
              <div className="mt-8">
                <ArtistReview
                  comment={rev.comment}
                  customerId={rev.customerId}
                  rating={rev.rating}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center  font-rocksalt text text-3xl text-artist/80 mt-[180px]">¡No tienes ninguna reseña aún! </p>
        )}
      </div>
    </div>
  );
};

export default reviews;
