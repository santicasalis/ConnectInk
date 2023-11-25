"use client"

import { useSelector, useDispatch } from "react-redux"
import { getAllArtists } from "../redux/features/artists/artistActions"
import { useEffect } from "react"
import Card from "@/components/card/Card"
import Nav from "@/components/nav/Nav"

export default function ExplorePage() {

    const artists = useSelector((state) => state.artists.people)
    console.log(artists)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllArtists())
    }, [])

    return (
        <>
        <Nav />
       
        <div className="flex flex-col mt-20 flex-wrap justify-start">
            {artists.map(artist => 
                artist?.tattoos.map((tattoo) => {
                    return <Card
                    key={tattoo.src}
                    name={artist.name}
                    location={artist.location}
                    tattoo={tattoo}
                    />
                })
            )}
        </div>
        </>
    )
}