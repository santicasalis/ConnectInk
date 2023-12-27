"use client";
import React from "react";
import AdminCardSuspended from "../../../components/adminCardSuspended/AdminCardSsuspended";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllArtists } from "../../../app/redux/features/artists/artistActions";
import { useState } from "react";
import PaginateAdmin from "../../../components/paginateAdmin/PaginateAdmin";
import { useRouter } from "next/navigation";
import { getDisabledArtists } from "../../redux/features/artists/artistActions";

const Suspended = () => {
  const { people, filtered } = useSelector((state) => state.artists);
  const user = useSelector((state) => state.user.logedInUser);
  console.log("ESTE ES EL USER", user);
  const dispatch = useDispatch();
  const router = useRouter();
  const disabledArtists = useSelector((state) => state.artists.disabled);
  console.log("ESTE ES EL DISABLED ARTISTS", disabledArtists);
  const [reload, setReload] = useState(false);
  const isOpenModalDisabledArtist = useSelector(
    (state) => state.modalDisabledArtist.isOpen
  );

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "admin") {
      router.replace("/");
    }
    dispatch(getDisabledArtists());
    dispatch(getAllArtists());
  }, []);

  useEffect(() => {
    dispatch(getDisabledArtists());
  }, [isOpenModalDisabledArtist]);

  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 5;
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const artistsToDisplay = disabledArtists.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );

  console.log("ESTE ES EL ARTISTS TO DISPLAY", artistsToDisplay);

  const totalArtists = disabledArtists.length;

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const noResults = artistsToDisplay.length === 0;

  return (

    <div className="bg-secondary-900 p-8 rounded-xl w-full shadow-lg shadow-admin/50 h-full">
      <h1 className="text-4xl text-artistfont font-rocksalt"> Artistas Suspendidos</h1>
      <hr className="my-8 border-admin/30" />
      <div className="scroll-fade flex justify-center items-center">
        <div>
          {noResults ? (
            <p className="text-admin/50 text-center mt-[180px] font-rocksalt text-2xl ">
              ¡No hay artistas suspendidos!
            </p>
          ) : (
            <>
              {artistsToDisplay?.map((filter) => (
                <div
                  key={filter.id}
                  className="mb-4 w-full flex justify-center items-center   "
                >
                  <AdminCardSuspended
                    key={filter.id}
                    id={filter.id}
                    fullName={filter.fullName}
                    location={filter.location}
                    shopName={filter.shopName}
                    tattoos={filter.publications}
                    image={filter.image}
                    reviews={filter.reviews}
                    email={filter.email}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Suspended;
