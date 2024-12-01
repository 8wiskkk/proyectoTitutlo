"use client";

import React from "react";
import { useCart } from "../CartContext"; // Ajusta la ruta si es necesario
import { useUser } from "@clerk/nextjs"; // Importa la información del usuario

const Carrito = () => {
  const {
    carrito,
    incrementarCantidad,
    disminuirCantidad,
    eliminarProducto,
    realizarCompra,
  } = useCart();

  const { user } = useUser(); // Información del usuario autenticado

  // Calcular el total del carrito
  const calcularTotal = () =>
    carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );

  const handleRealizarCompra = async () => {
    if (!user) {
      alert("Debes iniciar sesión para realizar la compra.");
      return;
    }

    try {
      const response = await realizarCompra(user.id);
      if (response.success) {
        alert("Compra realizada con éxito");
      } else {
        alert("Error al realizar la compra");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error durante la compra.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <h1 className="text-4xl font-extrabold text-white mb-8 mt-12 text-center">
        Carrito de Compras 🛒
      </h1>

      {carrito.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">
          Tu carrito está vacío.
        </p>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {carrito.map((producto) => (
              <div
                key={producto.id}
                className="bg-gray-800 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="rounded-lg h-40 w-full object-cover mb-4"
                />
                <h3 className="font-bold text-xl">{producto.nombre}</h3>
                <p className="text-green-400 font-semibold text-lg">
                  ${producto.precio.toLocaleString("es-CL")}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <button
                    className="bg-gray-700 hover:bg-gray-900 text-white px-3 py-1 rounded-l-lg"
                    onClick={() => disminuirCantidad(producto.id)}
                    disabled={producto.cantidad <= 1}
                  >
                    -
                  </button>
                  <div className="w-12 text-center bg-gray-900 text-white py-1">
                    {producto.cantidad}
                  </div>
                  <button
                    className="bg-gray-700 hover:bg-gray-900 text-white px-3 py-1 rounded-r-lg"
                    onClick={() => incrementarCantidad(producto.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-4 rounded-lg w-full"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  Eliminar del Carrito
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-200">
              Total: ${calcularTotal().toLocaleString("es-CL")}
            </h2>
            <button
              className="bg-green-600 hover:bg-green-800 text-white px-8 py-3 rounded-lg text-xl font-semibold"
              onClick={handleRealizarCompra}
            >
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
