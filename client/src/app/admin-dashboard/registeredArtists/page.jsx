"use client"
import React from 'react'
import AdminCard from "@/components/adminCard/AdminCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getAllArtists } from '@/app/redux/features/artists/artistActions';

const RegisteredArtist = () => {
  const { people, filtered } = useSelector((state) => state.artists);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getAllArtists());
  }, []);

  return (
    <div>
      
      <div className="scroll-fade md:w-3/4 flex flex-wrap gap-x-2">
              <div className="scroll-content w-full">
                {filtered?.map((filter) => (
                  <div key={filter.id} className="mb-4 w-full">
                    <AdminCard
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
  )
}

export default RegisteredArtist