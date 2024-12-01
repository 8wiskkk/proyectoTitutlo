"use client";

import React, { createContext, useContext, useState } from "react";
import { useUser } from "@clerk/nextjs";

// Define el tipo de producto en el carrito
type ProductoCarrito = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
};

// Define el tipo del contexto
type CartContextType = {
  carrito: ProductoCarrito[];
  agregarProducto: (producto: ProductoCarrito) => void;
  incrementarCantidad: (id: number) => void;
  disminuirCantidad: (id: number) => void;
  eliminarProducto: (id: number) => void;
  realizarCompra: (userId: string) => Promise<{ success: boolean }>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  const agregarProducto = (producto: ProductoCarrito) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);
    if (productoExistente) {
      setCarrito((prev) =>
        prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        )
      );
    } else {
      setCarrito((prev) => [...prev, { ...producto }]);
    }
  };

  const incrementarCantidad = (id: number) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (id: number) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(item.cantidad - 1, 1) }
          : item
      )
    );
  };

  const eliminarProducto = (id: number) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const realizarCompra = async (userId: string) => {
    try {
      const response = await fetch("/api/comprar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carrito, userId }),
      });

      if (!response.ok) {
        console.error("Error en la respuesta del servidor.");
        return { success: false };
      }

      // Vaciar el carrito si la compra fue exitosa
      setCarrito([]);
      return { success: true };
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      return { success: false };
    }
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        incrementarCantidad,
        disminuirCantidad,
        eliminarProducto,
        realizarCompra,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

