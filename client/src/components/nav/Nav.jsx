"use client"
import Button from "../button/Button";
import React, { useState } from "react";

export default function Nav() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownEnter = () => {
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex justify-between gap-8">
        <li>
          <Button link="/" text="ConnectInk!" />
        </li>
        <li>
          <Button link="/about" text="About" />
        </li>
        <li>
          <Button link="/explore" text="Explore" />
        </li>
        <li
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
          className="relative" // Agregamos una posición relativa al contenedor
        >
          <Button link="/tattoregform" text="Ingresar como" />
          {isDropdownOpen && (
            <div className="absolute bg-black p-2 mt-2 flex flex-col"> 
              {/* Cambiamos a flex y flex-col para mostrar los elementos uno debajo del otro */}
              <Button link="/auth/register" text="Artista" />
              <Button link="/register" text="Cliente" />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

//PENDIENTE VER ACCOUNT 