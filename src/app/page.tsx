"use client";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Inicio from "./components/sections/Inicio";
import Carta from "./components/sections/carta";
import Reserva from "./components/sections/Reserva";
import Carrito from "./components/sections/carrito";
import Ubicacion from "./components/ubicacion";

// Mapeo de las secciones
const sections: Record<string, React.ElementType> = {
  home: Inicio,
  carta: Carta,
  reserva: Reserva,
  carrito: Carrito,
  stats: Ubicacion,
};

export default function Home() {
  const [active, setActive] = useState("home");

  // Obtener el componente activo
  const ActiveSection = sections[active] || (() => <div>Sección no encontrada</div>);

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Barra de navegación */}
      <NavBar active={active} setActive={setActive} />
      
      {/* Sección dinámica */}
      <div className="flex-grow">
        <ActiveSection />
      </div>
    </div>
  );
}
