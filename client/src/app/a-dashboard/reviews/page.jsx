"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ArtistReview from "../../../components/ArtistReview/ArtistReview";

const reviews = () => {
  const user = useSelector((state) => state.user.logedInUser);
  console.log(user, "revev");
  const router = useRouter()

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "artist") {
      router.replace("/");
    }
  }, []);

  useEffect(() => {}, [user]);

  return (
    <div className="bg-secondary-900 p-8 rounded-xl w-full shadow-lg shadow-artist/50 pb-10">
    <div className=" w-full px-10">
      <h1 className=" text-4xl font-rocksalt w-full py-10 text-left border-transparent border-b-artist/30 border-[1px]">
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
    </div>
  );
};

export default reviews;
