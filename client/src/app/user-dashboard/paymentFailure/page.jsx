"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Reservas() {
  return (
    <div>
      <h1>EL PAGO FALLO, INTENTALO MAS TARDE</h1>
      <Link href="/user-dashboard">
        <button>Volver al inicio</button>
      </Link>
    </div>
  );
}
