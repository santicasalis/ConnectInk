"use client";

import { useEffect, useState } from "react";
import AdminPostDashboard from "../../../../components/adminPostDashboard/AdminPostDashboard"
import axios from "axios";
import Link from "next/link";
import { CiShop } from "react-icons/ci";
import { BsFillFilePostFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const RegArtistById = ({ params }) => {
  const [artist, setArtist] = useState({ publications: [] });
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "admin") {
      router.replace("/");
    }
    axios
      .get(`http://localhost:3001/tattooArtists/${params.id}`)
      .then((response) => {
        setArtist(response.data);
      });
  }, [params.id]);



  return (
    <div className="">
      <div className="m-[10px] flex ">
       
      </div>
      <div className="bg-secondary-100 h-[200px] mb-[30px]   grid grid-cols-2 w-full rounded relative">
        <div className="rounded-full w-[140px] h-[140px]  overflow-hidden mt-8 ml-4">
          <img
            src={artist.image}
            height={32}
            width={32}
            alt={artist.fullName}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className=" absolute ml-[190px] text ">
          <h1 className="text-4xl mb-[20px] flex gap-2 mt-4 ">
            {" "}
            {/* <VscAccount className="text-primary/75"  />  */}
            <div className="font-newrocker text-[50px] ">
            {artist.fullName}
              </div>
          </h1>
          <h2 className="text-xl flex gap-2 mb-2">
            {" "}
            <CiShop className="text-admin/75 ml-10 mt-5 text-3xl" /> 
            <div className="mt-5">
            {artist.shopName}
            </div>
          </h2>
          {artist.publications.length === 1 ? (
            <h2 className="text-xl flex gap-2">
              {" "}
              <BsFillFilePostFill className="text-admin/60 "  />{" "}
              {artist.publications.length} Publicacion{" "}
            </h2>
          ) : (
            <h2 className="text-xl flex gap-2">
              {" "}
              <BsFillFilePostFill className="text-admin/60 ml-10 mt-5 text-3xl" />{" "}
              <p className="mt-5"> {artist.publications.length} </p> <p className="mt-5"> Publicaciones{" "}</p>
            </h2>
          )}
        </div>
      </div>
      <Link href="/admin-dashboard/registeredArtists">
          <button className="border-[2px] border-admin hover:bg-admin/25 w-[10%] font-rocksalt p-4  mb-5">
            Volver
          </button>
        </Link>

      {artist?.publications.length > 0 ? (
        artist.publications.map((publication) => (
          <AdminPostDashboard
            key={publication.id}
            publication={publication}
            image={artist.image}
            name={artist.fullName}
            email={artist.email}
          />
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
    </div>
  );
};

export default RegArtistById;
