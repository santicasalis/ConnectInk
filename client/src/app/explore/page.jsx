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

import "../explore/page.css";

export default function ExplorePage() {
  const { people, filtered } = useSelector((state) => state.artists);

  const dispatch = useDispatch();
  
  const styles = useSelector((state) => state.styles.names);
  const [filters, setFilters] = useState({ 
    location: "",
    tattoStyle: [] 
    });

  useEffect(() => {
    dispatch(getAllStyles());
    dispatch(getAllArtists());
  }, []);

  return (
    <div className="w-full">
      <Nav />

      <div>
        <section className="flex flex-col md:flex-row gap-x-1 text-center">
          <div className="flex-1">
            <h2 className="font-bold h-[50%] text-4xl">
              Bienvenidos al Reino de la Inspiracion{" "}
              <span className="text-primary">Ink</span>orporada
            </h2>
            <p className="text-justify h-[50%] ml-5 text-xl">
              En nuestro santuario del arte corporal, cada trazo cuenta una
              historia, cada línea lleva consigo la esencia de un viaje
              personal. En el lienzo de la piel, exploramos la intersección
              entre la imaginación y la realidad, transformando ideas en
              tatuajes que resuenan con significado.
            </p>
          </div>

          <div className="flex-1">
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
              className="w-[450px] flex justify-center items-center bg-secondary-100 h-[320px]
                    bg-[url(https://vean-tattoo.es/media/images/Den_rozhd.2e16d0ba.fill-700x320-c0.format-jpeg.jpg)]
                     bg-cover rounded"
            >
              <SwiperSlide className="mt-[150px] font-bold text-xl">
                Encuentra la belleza en la simplicidad. Un tatuaje no solo
                decora tu piel, sino que también cuenta tu historia en las
                líneas más simples.{" "}
              </SwiperSlide>{" "}
              <SwiperSlide className="mt-[150px] font-bold text-xl">
                La poesía de la tinta. Cada tatuaje es una estrofa, cada estrofa
                es una expresión. ¿Cuál será tu próximo verso?{" "}
              </SwiperSlide>{" "}
              <SwiperSlide className="mt-[150px] font-bold text-xl">
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
        </section>

        <hr className="mt-[50px] border-primary ml-[50px] mr-[50px]"></hr>

        <section className="flex h-[680px]">
          <div className="flex flex-col md:flex-row justify-center mt-8 mx-4 my-4 gap-x-4">
            <div className="md:w-1/4">
              <FilterSideBar />
            </div>

            <div className="scroll-fade md:w-3/4 flex flex-wrap gap-x-2">
              <div className="scroll-content w-full">
                {filtered?.map((filter) => (
                  <div key={filter.id} className="mb-4 w-full">
                    <Card
                      key={filter.id}
                      name={filter.name}
                      lastName={filter.lastName}
                      location={filter.location}
                      shopName={filter.shopName}
                      tattoos={filter.publications}
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
