"use client"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="bg-secondary-900 h-[300px] rounded w-[40%] mx-auto flex shadow-artist shadow-lg">
        <div className="">
            <img src={customer.image} className=" m-6 w-36 h-36 object-cover rounded-full"></img>
            
            <h1 className="m-6 text-[17px] font-bold">{customer.fullName}</h1>
            <p className="m-6">puntuacion: {rating}</p>
        </div>
        <div className="w-[60%]">
            
            <h1 className="text-[22px] font-rocksalt mt-4">Comentario:</h1>
            <p className="mt-4">{comment}</p>
        </div>
      
    </div>
  )
}

export default ArtistReview