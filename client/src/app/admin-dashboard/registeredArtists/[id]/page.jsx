
"use client"

import { useEffect, useState } from "react";
import PostDashboard from "../../../../components/postDashboard/PostDashboard";
import axios from "axios";
import Link from "next/link";
import { CiShop } from "react-icons/ci";
import { BsFillFilePostFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";





const RegArtistById = ({params}) => {

const [artist, setArtist] = useState({ publications: [] });





useEffect( () => {
    axios.get(`http://localhost:3001/tattooArtists/${params.id}`).then(
        (response)=> {
            setArtist(response.data);
            
        }
    )
}, [params.id]
    
)
console.log(artist.publications, "soyyyy");

  return (
    <div className="">
      <div className="m-[50px] ">
            <Link href="/admin-dashboard/registeredArtists">
            <button className="border-[2px] border-primary mt-[10px] w-[10%] font-rocksalt">
                Volver
            </button>
            </Link>
            
          </div>
          <div className="bg-secondary-100 h-[200px] mb-[60px] ml-[20px] grid grid-cols-2 w-[60%] rounded relative">
            
            <div className='rounded-full w-[140px] h-[140px] m-[8px]  overflow-hidden'>
                            <img  src={artist.image} height={32} width={32} alt={artist.fullName} style={{width:'100%', height:'100%' }}/>
            </div>
            <div className=" absolute ml-[190px]">
              <h1 className="text-4xl mb-[20px] flex gap-2 mt-4"> <VscAccount className="text-primary/75"/> {artist.fullName}</h1>
              <h2 className="text-xl flex gap-2 mb-2"> <CiShop className="text-primary/75" /> {artist.shopName}</h2>
              {artist.publications.length === 1 ? <h2 className="text-xl flex gap-2"> <BsFillFilePostFill  className="text-primary/60"/> {artist.publications.length} Publicacion </h2> :
              <h2 className="text-xl flex gap-2"> <BsFillFilePostFill  className="text-primary/60"/> {artist.publications.length} Publicaciones </h2>}
              
            </div>
            
          </div>
          
           {artist?.publications.length > 0 ? (
        artist.publications.map((publication) => (
          <PostDashboard
            key={publication.id}
            publication={publication}
            image={artist.image}
            name={artist.fullName}
          />
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
          
          
          
    </div>
  )
}

export default RegArtistById

