"use client"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import StarReviews from "../starreviews/StarReviews";

const ArtistReview = ({comment, customerId, rating}) => {

    const user = useSelector((state) => state.user.logedInUser);
    const URL_BASE = "http://localhost:3001";
    const [customer, setCustomer]= useState({})

    useEffect(()=>{

        try {
            const getCustomer = async ()=>{
                const response = (await axios.get(`${URL_BASE}/customers/${customerId}`)).data
                setCustomer(response)
        
                }
                getCustomer()
                
        } catch (error) {
            console.log(error.messagge, "hay un error bb")
        }

       

    },[])
  return (
    <div className="flex justify-center items-center mt-8">
        <div className="bg-secondary-900 h-[300px] rounded w-[40%] mx-auto flex shadow-artist shadow-lg">
            <div className=" flex flex-col items-center">
                <img src={customer.image} className=" m-6 w-36 h-36 object-cover rounded-full"/>
                 <h1 className="text-[17px] font-bold mb-2">
                    {customer.fullName}
                </h1>
                {/* <p className=" mb-2">
                    Valoración: {rating}
                </p> */}
                <div className="font-bolt text-artist text-center text-xl mt-[10px]  flex items-center justify-center ml-8">
                    <StarReviews value={1} rating={rating}  />
                    <StarReviews value={2} rating={rating} />
                    <StarReviews value={3} rating={rating} />
                    <StarReviews value={4} rating={rating} />
                    <StarReviews value={5} rating={rating} />
                    {rating != null ? (
                    <p className="ml-2 text-[22px]">{rating.toFixed(1)}</p>
                    ) : (
                    <p className="ml-2 text-[22px]">0.0</p>
                    )}
                </div>
            </div>
            <div className="w-[60%] flex flex-col "> 
                <h1 className="text-[22px] font-rocksalt mt-6 flex justify-center mb-[55px]">Comentario:</h1>
                    <p className="ml-5 justify-center">{comment}</p>
            </div>
        </div>
        
    </div>
  )
}

export default ArtistReview