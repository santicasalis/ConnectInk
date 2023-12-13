"use client"
import React from 'react'
import AdminCard from "../../../components/adminCard/AdminCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getAllArtists } from '../../../app/redux/features/artists/artistActions';
import { useState } from 'react';
import PaginateAdmin from '../../../components/paginateAdmin/PaginateAdmin';
import { useRouter } from 'next/navigation';
import AdminTopBarOptions from "../../../components/admintopBarOptions/AdminTopBarOptions";


const RegisteredArtist = () => {
  const { people, filtered } = useSelector((state) => state.artists);
  const user = useSelector((state) => state.user.logedInUser)
  const dispatch = useDispatch();
  const router = useRouter()
  const { isOpen, data } = useSelector((state) => state.modalDeleteArtist);
  
    useEffect(() => {
      if(!user.userType){
        router.replace("/auth")
      } else if (user.userType !== "admin"){
        router.replace("/")
      }
    dispatch(getAllArtists());
  }, []);

  useEffect(() => {
    setArtistsToDisplay(filtered.slice(
      indexOfFirstArtist,
      indexOfLastArtist
    ))
  }, [isOpen])

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 5;
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const [artistsToDisplay, setArtistsToDisplay] = useState(filtered.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  ))

  const totalArtists = filtered.length;
 
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>

      

      <div className="scroll-fade md:w-3/4 flex flex-wrap gap-x-2 text-artistfont">

      <div className='w-full'>
       <AdminTopBarOptions />
       </div>
      <div className="scroll-fade md:w-3/4 flex flex-wrap gap-x-2">

              <div className="scroll-content w-full">
                
              <div className="scroll-fade flex flex-1 flex-wrap gap-x-2">
              <div className="scroll-content w-full">
                <PaginateAdmin
                  artistsPerPage={artistsPerPage}
                  totalArtists={totalArtists}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
              </div>
                           

      <div className="scroll-fade flex justify-center items-center">
              <div >
                {artistsToDisplay?.map((filter) => (
                  <div key={filter.id} className="mb-4 w-full flex justify-center items-center   ">


                        <AdminCard
                          key={filter.id}
                          id={filter.id}
                          fullName={filter.fullName}
                          location={filter.location}
                          shopName={filter.shopName}
                          tattoos={filter.publications}
                          image={filter.image}
                          reviews={filter.reviews}
                          email={filter.email}
                        />
                      </div>
                ))}

                {/* {filtered?.map((filter) => (
                  <div key={filter.id} className="mb-4 w-full ">
                    <AdminCard
                      key={filter.id}
                      id={filter.id}
                      name={filter.name}
                      lastName={filter.lastName}
                      location={filter.location}
                      shopName={filter.shopName}
                      tattoos={filter.publications}
                      image={filter.image}
                    />
                  </div>
                ))} */}
              </div>
            </div>
            </div>
            </div>

            
    </div>
    </div>

            </div>
            

  
  )
}

export default RegisteredArtist