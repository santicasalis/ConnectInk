"use client"


import Link from "next/link";
import React from 'react'

const page = () => {
  return (
    <div className="flex  items-center justify-center h-screen ">
        <div className="bg-secondary-900 h-[550px] w-[550px] rounded flex flex-col items-center gap-[20px]">
            <p className="mt-[35px] font-rocksalt text-4xl">Connect<span className="text-primary">Ink.</span><span className="text-[17px]">(admin)</span></p>
            <div className="">
            </div>
            <form className="flex flex-col gap-[35px] mt-[30px] ">
            <h1 className="font-bold text-xl">Ingresar<span className="text-primary font-bold">.</span></h1>
            <div className="w-72">
        <Input label="Email" color="white" type="email" />
        </div>
        <div className="w-72">
        <Input type="password" label="Contraseña" color="white" />
        </div>
        <Link  href="/admin-dashboard">
        <Button>Ingresar</Button>
        </Link>

        

        <Button
        size="lg"
        variant="outlined"
        color="white"
        className="flex items-center gap-3"
      >
        <img src="https://docs.material-tailwind.com/icons/google.svg" alt="google" className="h-6 w-6" />
        Ingresar con Google
      </Button>
            </form>
        </div>
    </div>
  )
}

export default page

