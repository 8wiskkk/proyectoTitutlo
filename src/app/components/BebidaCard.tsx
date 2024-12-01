import React, { useState } from "react";
import { useCart } from "./CartContext";

// Definición del tipo Bebida para tipado estricto
type Bebida = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidadDisponible: number;
  imagen: string;
};

const BebidaCard: React.FC<{ bebida: Bebida }> = ({ bebida }) => {
  const { agregarProducto } = useCart(); // Hook para manejar el carrito
  const [cantidad, setCantidad] = useState(1); // Estado local para manejar la cantidad seleccionada

  // Manejar la acción de agregar producto al carrito
  const handleAgregar = () => {
    agregarProducto({
      id: bebida.id,
      nombre: bebida.nombre,
      imagen: bebida.imagen,
      precio: bebida.precio,
      cantidad,
    });
  };

  // Validar la cantidad seleccionada (dentro del rango permitido)
  const handleChangeCantidad = (value: number) => {
    if (value > 0 && value <= bebida.cantidadDisponible) {
      setCantidad(value);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-4 w-full sm:w-64 m-4 fade-slide-in">
      {/* Imagen de la bebida */}
      <img
        src={bebida.imagen}
        alt={bebida.nombre}
        className="rounded-lg h-40 w-full object-cover mb-4"
      />
      {/* Nombre y precio */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{bebida.nombre}</h3>
        <span className="text-green-400 font-semibold text-lg">
          ${bebida.precio.toLocaleString("es-CL")}
        </span>
      </div>
      {/* Descripción */}
      <p className="text-gray-300 text-sm mb-4">{bebida.descripcion}</p>
      {/* Selector de cantidad */}
      <div className="flex items-center mt-2">
        <button
          onClick={() => handleChangeCantidad(cantidad - 1)}
          className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-l-lg"
          disabled={cantidad <= 1}
        >
          -
        </button>
        <div className="w-12 text-center bg-gray-900 text-white py-1">
          {cantidad}
        </div>
        <button
          onClick={() => handleChangeCantidad(cantidad + 1)}
          className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-r-lg"
          disabled={cantidad >= bebida.cantidadDisponible}
        >
          +
        </button>
      </div>
      {/* Botón para agregar al carrito */}
      <button
        onClick={handleAgregar}
        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-4 py-2 mt-4 rounded-lg w-full"
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default BebidaCard;

