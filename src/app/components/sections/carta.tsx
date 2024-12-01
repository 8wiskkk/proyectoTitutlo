"use client";

import React, { useEffect, useState } from "react";
import BebidaCard from "../BebidaCard";

type Bebida = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidadDisponible: number;
  imagen: string;
};

const imagenesBebidas: Record<string, string> = {
  Mojito: "https://images.unsplash.com/photo-1668533889350-21a05111310b?q=80&w=2035&auto=format&fit=crop",
  Margarita: "https://images.unsplash.com/photo-1557765086-a73d2dc3059e?q=80&w=2070&auto=format&fit=crop",
  "Piña Colada": "https://images.unsplash.com/photo-1607446045710-d5a8fd9bc1db?q=80&w=1974&auto=format&fit=crop",
  Negroni: "https://images.unsplash.com/photo-1619978537593-6378acd9d6a9?q=80&w=1964&auto=format&fit=crop",
};

const ListaBebidas: React.FC<{ bebidas: Bebida[]; loading: boolean }> = ({
  bebidas,
  loading,
}) => (
  <>
    {loading ? (
      <p className="text-gray-400 text-center text-lg">Cargando bebidas...</p>
    ) : bebidas.length === 0 ? (
      <p className="text-gray-500 text-center text-lg">
        No hay bebidas disponibles.
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {bebidas.map((bebida) => (
          <BebidaCard key={bebida.id} bebida={bebida} />
        ))}
      </div>
    )}
  </>
);

const Carta = () => {
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        const bebidasConImagenes = data.bebidas.map((bebida: Bebida) => ({
          ...bebida,
          imagen: imagenesBebidas[bebida.nombre] || "",
        }));
        setBebidas(bebidasConImagenes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar bebidas:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-white mb-8 mt-12 text-center">
          Barra de Tragos 🍸
        </h1>
        <p className="text-gray-400 text-lg mb-10 text-center">
          Descubre nuestra exclusiva selección de tragos clásicos para tus mejores momentos.
        </p>
        <h2 className="text-3xl font-bold text-gray-300 mb-6">
          Tragos Clásicos
        </h2>
        <ListaBebidas bebidas={bebidas} loading={loading} />
      </div>
      <style jsx>{`
        .fade-slide-in {
          animation: fadeInSlideDown 800ms ease-out forwards;
        }
        @keyframes fadeInSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Carta;
