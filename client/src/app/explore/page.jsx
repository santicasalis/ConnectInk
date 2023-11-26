"use client"

import { useSelector, useDispatch } from "react-redux"
import { getAllArtists } from "../redux/features/artists/artistActions"
import { useEffect, useState } from "react"
import Card from "@/components/card/Card"
import Nav from "@/components/nav/Nav"
import { getAllStyles } from "../redux/features/styles/stylesActions"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation"
import 'swiper/css/pagination';
import { Parallax, Autoplay, Pagination, Navigation } from 'swiper/modules'
import FilterSideBar from "../../components/filterSideBar/FilterSideBar"

export default function ExplorePage() {

    const {people, filtered} = useSelector((state) => state.artists)
   

   
    const styles = useSelector((state) => state.styles.names)
    const [filters, setFilters] = useState({location: "", tattoStyle: []})

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllStyles())
        dispatch(getAllArtists())
    }, [])

    return (
        <>
        <Nav />
        

        <div>
            <section className="grid grid-cols-2 text-center h-[300px] ">
                <div className="col-span-1">
                    <h2 className="font-bold text-4xl">Bienvenidos al Reino de la Inspiracion <span className="text-primary">Ink</span>orporada</h2>
                    <p className="text-justify ml-[250px] mt-[50px] w-[600px] text-xl ">
                        En nuestro santuario del arte corporal, cada trazo cuenta una historia, cada línea lleva consigo la esencia de un viaje personal.
                         En el lienzo de la piel, exploramos la intersección entre la imaginación y la realidad, transformando ideas en tatuajes que resuenan con significado.
                        </p>
                </div>
                <div className="col-span-1">
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
                     className="w-[450px] flex justify-center items-center bg-secondary-100 h-[320px] w-[700px]
                      bg-[url(https://vean-tattoo.es/media/images/Den_rozhd.2e16d0ba.fill-700x320-c0.format-jpeg.jpg)]
                       bg-cover rounded   "
                     >
                        <SwiperSlide className='mt-[150px] font-bold text-xl'>Encuentra la belleza en la simplicidad. Un tatuaje no solo decora tu piel, sino que también cuenta tu historia en las líneas más simples.</SwiperSlide>
                        <SwiperSlide className='mt-[150px] font-bold text-xl'>La poesía de la tinta. Cada tatuaje es una estrofa, cada estrofa es una expresión. ¿Cuál será tu próximo verso?</SwiperSlide>
                        <SwiperSlide className='mt-[150px] font-bold text-xl'>Palabras que perduran. Un tatuaje corto, una vida de significado. Exprésate con precisión, deja que tu piel hable por ti.</SwiperSlide>
                        <SwiperSlide className='mt-[150px] font-bold text-xl'>Menos es más. Descubre la magia de las palabras concisas. Tus tatuajes son recordatorios diarios de lo que realmente importa</SwiperSlide>
                    </Swiper>

                    
                </div>

            </section>
            <hr className="mt-[50px] border-primary ml-[50px] mr-[50px]"></hr>
        </div>
        
       
        <div className="flex justify-center mt-[75px] grid grid-cols-5 mx-[25px] my-[25px]  ">
            <div className="grid grid-cols-1 flex-1"><FilterSideBar/></div>
            
        <div className="grid grid-cols-4 gap-8 col-span-4">
            {filtered.map(artist => 
            <div key={artist.id} className="col-span-2">
                    <Card
                    key={artist.id}
                    name={artist.name}
                    lastName={artist.lastName}
                    location={artist.location}
                    shopName={artist.shopName}
                    tattoos={artist.publications}
                    />
                    </div>
                
            )}
            </div>
        </div>
        </>
    )
}