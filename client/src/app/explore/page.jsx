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
  console.log(artistsToDisplay);
  const totalArtists = filtered.length;
  console.log(totalArtists);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <Nav />

      <div className="w-full">
        <section className="flex flex-col w-full justify-center items-center gap-x-1 text-center">
          <div className="w-[80%] flex flex-col justify-center items-center">
              <div className="w-full mb-9">
                <h2 className="font-bold  text-[50px] font-newrocker">
                  Bienvenidos al Reino de la Inspiracion
                  <span className="text-primary"> Ink</span>orporada!
                </h2>
              </div>
              <div className="flex w-[900px] gap-x-9">
                <div className="w-[50%] flex items-center px-6">
                  <p className="text-center  text-[20px] text-white/70">
                      "En nuestro santuario del arte corporal, cada trazo cuenta una
                      historia, cada línea lleva consigo la esencia de un viaje
                      personal. En el lienzo de la piel, exploramos la intersección
                      entre la imaginación y la realidad, transformando ideas en
                      tatuajes que resuenan con significado."
                  </p>
                </div>
                
                <div className="flex-1 rounded-lg overflow-hidden shadow-2xl" >
                  <Swiper
                    spaceBetween={25}
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
                    className="w-[500px] flex justify-center items-center relative text-center p-5 bg-secondary-100 h-[320px]
                          bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNBKiJssb1Mf-5bcopnN8n0GIFe5WAYAUKfg&usqp=CAU)]
                          bg-cover rounded"
                  >
                    <SwiperSlide className=" mt-[150px] font-bold text-[25px] w-[400px]">
                      Encuentra la belleza en la simplicidad. Un tatuaje no solo
                      decora tu piel, sino que también cuenta tu historia en las
                      líneas más simples.{" "}
                    </SwiperSlide>{" "}
                    <SwiperSlide className="mt-[150px] font-bold text-xl  w-[400px]">
                      La poesía de la tinta. Cada tatuaje es una estrofa, cada estrofa
                      es una expresión. ¿Cuál será tu próximo verso?{" "}
                    </SwiperSlide>{" "}
                    <SwiperSlide className="mt-[150px] font-bold text-xl  w-[400px]">
                      Palabras que perduran. Un tatuaje corto, una vida de
                      significado. Exprésate con precisión, deja que tu piel hable por
                      ti.{" "}
                    </SwiperSlide>
                    //{" "}
                    <SwiperSlide className="mt-[150px] font-bold text-xl">
                      Menos es más. Descubre la magia de las palabras concisas. Tus
                      tatuajes son recordatorios diarios de lo que realmente importa{" "}
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
          </div>
          
            
        </section>

        <hr className="mt-[50px] border-white/20 ml-[50px] mr-[50px]"></hr>

        <section className="flex w-full">
          <div className="w-full flex flex-col md:flex-row justify-center mt-8 mx-4 my-4 gap-x-4">
            <div className="md:w-1/4">
              <FilterSideBar />
            </div>

            <div className="scroll-fade flex flex-1 flex-wrap gap-x-2">
              <div className="scroll-content w-full">
                <Paginate
                  artistsPerPage={artistsPerPage}
                  totalArtists={totalArtists}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
                {artistsToDisplay?.map((filter) => (
                  <div key={filter.id} className="mb-4 w-full flex flex-col items-center justify-center">
                    
                    <Card
                      id={filter.id}
                      fullName={filter.fullName}
                      location={filter.location}
                      shopName={filter.shopName}
                      publications={filter.publications}
                      image={
                        "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                      }
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
