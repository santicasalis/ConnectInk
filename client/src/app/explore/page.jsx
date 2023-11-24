"use client"

import { useSelector, useDispatch } from "react-redux"
import { getAllArtists } from "../redux/features/artists/artistActions"
import { useEffect } from "react"
import Card from "@/components/card/Card"
import Nav from "@/components/nav/Nav"

export default function ExplorePage() {

    const artists = useSelector((state) => state.artists.people)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllArtists())
        
    }, [])

    return (
        <>
        <Nav />
       
        <div className="flex flex-col mt-20 flex-wrap justify-start">
            {artists.map(artist => 
                     <Card
                    key={artist.id}
                    name={artist.name}
                    lastName={artist.lastName}
                    location={artist.location}
                    shopName={artist.shopName}
                    tattoos={artist.tattoos}
                    />
                
            )}
        </div>
        </>
    )
}