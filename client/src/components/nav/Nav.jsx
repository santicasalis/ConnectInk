"use client"

import Button from "../button/Button";
import React, { useState } from "react";

export default function Nav() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
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
        <li>
      
          <div class="relative inline-block text-left">
  <div>
  <button onClick={handleDropdownToggle} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-slate-500y px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-400">
      Ingresar como
  </button>
  </div>

    {isDropdownOpen && (
       <div
          onBlur={handleDropdownClose}
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <Button
                    className="text-gray-700 block px-4 py-2 text-sm"
                    link="/auth/register"
                    text="Artista"
                  />
                  <Button
                    className="text-gray-700 block px-4 py-2 text-sm"
                    link="/auth"
                    text="Cliente"
                  />
                </div>
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}