"use client";

import { useSelector, useDispatch } from "react-redux";
import { getAllArtists } from "../redux/features/artists/artistActions";
import { useEffect, useState } from "react";
import Card from "@/components/card/Card";
import Nav from "@/components/nav/Nav";
import { getAllStyles } from "../redux/features/styles/stylesActions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";
import FilterSideBar from "../../components/filterSideBar/FilterSideBar";
import Paginate from "@/components/paginate/Paginate";
import "../explore/page.css";
import Link from "next/link";

export default function ExplorePage() {
  const { people, filtered } = useSelector((state) => state.artists);

  const dispatch = useDispatch();

  const styles = useSelector((state) => state.styles.names);
  const [filters, setFilters] = useState({
    location: "",
    tattoStyle: [],
  });

  useEffect(() => {
    dispatch(getAllStyles());
    dispatch(getAllArtists());
    setFilterSidebarVisible(true);
  }, []);

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 5;
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const artistsToDisplay = filtered.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );
  const totalArtists = filtered.length;
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [filterSidebarVisible, setFilterSidebarVisible] = useState(false);

  const handleToggleFilterSidebar = () => {
    setFilterSidebarVisible(!filterSidebarVisible);
  };

  return (

    <div className="w-full bg-secondary-900">



      <div className="w-full">
        <section className="flex flex-col w-full justify-center items-center gap-x-1 text-center">
          <div className="w-[80%] sm:flex sm:flex-col sm:justify-center sm:items-center">
            <div className="w-full mb-9">
              <h2 className="font-bold  text-[50px] font-newrocker ">
                Bienvenidos al Reino de la Inspiracion
                <span className="text-primary"> Ink</span>orporada!
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-4 sm:w-full w-full">
              <div className="flex items-center sm:w-full mb-4">
                <p className="text-center text-[20px] text-white/70 sm:w-full">
                  "En nuestro santuario del arte corporal, cada trazo cuenta una
                  historia, cada línea lleva consigo la esencia de un viaje
                  personal. En el lienzo de la piel, exploramos la intersección
                  entre la imaginación y la realidad, transformando ideas en
                  tatuajes que resuenan con significado."
                </p>
              </div>

              <div className="flex rounded-lg  shadow-2xl  w-full relative  overflow-hidden">
                <img className="absolute w-full h-full object-cover" src="https://media.istockphoto.com/id/1320388570/es/foto/manos-de-un-tatuador-con-guantes-negros-y-sosteniendo-una-máquina.jpg?s=612x612&w=0&k=20&c=20XaUXZaEiJ8C0877TxICFtvgwaBfmIiUoYWXVVSmxg=" />
                <div className="w-full h-full bg-black opacity-60 absolute">  </div> 
                <Swiper
                  spaceBetween={30}
                  parallax={true}
                  centeredSlides={true}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Parallax, Autoplay, Pagination, Navigation]}
                  className="w-full flex justify-center items-center relative text-center p-5 h-[350px] "
                >

                  <SwiperSlide className=" mt-[150px] font-bold text-[20px]  w-[50%] ">
                    Encuentra la belleza en la simplicidad. Un tatuaje no solo
                    decora tu piel, sino que también cuenta tu historia en las
                    líneas más simples.{" "}
                  </SwiperSlide>{" "}
                  <SwiperSlide className="mt-[150px] font-bold text-[20px]  w-[50%] ">
                    La poesía de la tinta. Cada tatuaje es una estrofa, cada
                    estrofa es una expresión. ¿Cuál será tu próximo verso?{" "}
                  </SwiperSlide>{" "}
                  <SwiperSlide className="mt-[150px] font-bold text-[20px]  w-[50%] ">
                    Palabras que perduran. Un tatuaje corto, una vida de
                    significado. Exprésate con precisión, deja que tu piel hable
                    por ti.{" "}
                  </SwiperSlide>
                  //{" "}
                  <SwiperSlide className="mt-[150px] font-bold text-xl sm:text-m w-full  ">
                    Menos es más. Descubre la magia de las palabras concisas.Tus
                    tatuajes son recordatorios diarios de lo que realmente
                    importa{" "}
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </section>

        <hr className="mt-[50px] border-primary/40 ml-[50px] mr-[50px]"></hr>

        <section className="flex w-full ">
          <div className="w-full flex flex-col md:flex-row justify-center mt-8 ml-10 my-4 gap-x-4">
            <div className="md:w-1/4 flex flex-col items-center">
              <button
                onClick={handleToggleFilterSidebar}
                className="sm:inline-block md:hidden text-white text-xl mb-4"
              >
                {filterSidebarVisible ? "Ocultar Filtros" : "Mostrar Filtros"}
              </button>
              {filterSidebarVisible && <FilterSideBar />}
            </div>

            <div className="scroll-fade flex flex-1 flex-wrap gap-x-2">
              <div className=" flex flex-col items-center scroll-content w-full ">
                <Paginate
                  artistsPerPage={artistsPerPage}
                  totalArtists={totalArtists}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
                {artistsToDisplay?.map((filter) => (
                  <div
                    key={filter.id}
                    className="mb-4 w-full flex flex-col items-center justify-center mr-10"
                  >
                    <Card
                      id={filter.id}
                      fullName={filter.fullName}
                      location={filter.location}
                      shopName={filter.shopName}
                      publications={filter.publications}
                      image={filter.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
