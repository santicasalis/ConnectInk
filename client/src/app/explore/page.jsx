"use client"

import { useSelector, useDispatch } from "react-redux"
import { getArtists } from "../redux/features/artists/artistsSlice"
import { useEffect } from "react"
import Card from "@/components/card/Card"

export default function ExplorePage() {

    const artists = useSelector((state) => state.artists.people)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArtists())
    }, [])

    return (
        <div className="flex mt-20 flex-wrap justify-start">
            {artists.map(artist => 
                artist.tattoos.map((tattoo) => {
                    return <Card
                    key={tattoo.src}
                    name={artist.name}
                    location={artist.location}
                    tattoo={tattoo}
                    />
                })
            )}
        </div>
        
    )
}