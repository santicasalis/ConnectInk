"use client"
import Button from "../button/Button";
import React, { useState } from "react";

export default function Nav() {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    
    const handleAccountHover = () => {
      setDropdownOpen(true);
    };
  
    
    const handleAccountLeave = () => {
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
            onMouseEnter={handleAccountHover}
            onMouseLeave={handleAccountLeave}
          >
            <Button link="/tattoregform" text="Account" />
            {isDropdownOpen && (
              <div className="absolute bg-black p-2 mt-2">
                
                <Button link="/login" text="Login" />
                <Button link="/register" text="Register" />
              </div>
            )}
          </li>
        </ul>
      </nav>
    )
  }