"use client"

import { useSelector, useDispatch } from "react-redux"
import { getAllArtists } from "../redux/features/artists/artistActions"
import { useEffect, useState } from "react"
import Card from "@/components/card/Card"
import Nav from "@/components/nav/Nav"
import { getAllStyles } from "../redux/features/styles/stylesActions"
import FilterSideBar from "@/components/filterSideBar/FilterSideBar"

export default function ExplorePage() {
    const artists = useSelector((state) => state.artists.people);
    console.log(artists)
    const styles = useSelector((state) => state.styles.names);
    const [filters, setFilters] = useState({ location: "", tattooStyle: [] });
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllStyles());
      dispatch(getAllArtists());
    }, []);
  
    const handleFilterChange = (filters) => {
      setFilters(filters);
    };
  
    return (
      <div>
        <Nav />
        <FilterSideBar onFilterChange={handleFilterChange} />
        <div className="flex flex-col mt-20 flex-wrap justify-start">
          {artists.map((artist) => (
            <div key={artist.id}>
              <Card
                name={artist.name}
                lastName={artist.lastName}
                location={artist.location}
                shopName={artist.shopName}
                tattoos={artist.publications}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }