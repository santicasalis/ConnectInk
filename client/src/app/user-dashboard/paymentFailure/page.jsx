"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCreditCardOff } from "react-icons/md";
import Link from "next/link";

export default function Reservas() {
  return (
    <div className="bg-secondary-900 w-[50%] h-[20%] rounded ">
       
      
      <div className="flex item-center justify-center mt-8 gap-x-3">
      <MdOutlineCreditCardOff className="text-primary text-[30px]"/>
          <h1 className="text-[25px] text-artistfont">EL PAGO HA FALLADO</h1>
      </div>
      <div>
        <p className="text-center mt-6 text-[14px] text-artistfont">La transaccion no pudo ser procesada. Por favor, intentalo de nuevo con otra tarjeta de credito u otro metodo de pago</p>
      </div>

      <div className="flex item-center justify-center mt-6 ">
              <Link href="/user-dashboard">
                <button className="border-[1px] w-[150px] hover:border-primary  border-primary/50 rounded text-artistfont ">Volver al inicio</button>
              </Link>
      </div>
            
      
    </div>
  );
}
