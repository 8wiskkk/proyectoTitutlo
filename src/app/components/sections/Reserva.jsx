"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Reserva() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [mesaSeleccionada, setMesaSeleccionada] = useState("");
  const [motivoReserva, setMotivoReserva] = useState("");

  const confirmarReserva = () => {
    if (!mesaSeleccionada) {
      alert("Por favor, selecciona una mesa antes de confirmar la reserva.");
      return;
    }
    if (!motivoReserva) {
      alert("Por favor, selecciona un motivo para la reserva.");
      return;
    }
    alert(`Reserva confirmada: 
      Fecha - ${fechaSeleccionada.toDateString()}, 
      Mesa - ${mesaSeleccionada}, 
      Motivo - ${motivoReserva}`);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen p-6">
      <div className="max-w-lg mx-auto bg-gray-800 shadow-lg rounded-lg p-8 text-white fade-slide-in">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-white">
          Reserva de Mesa 🪑
        </h1>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-300">
            Fecha
          </label>
          <div className="p-4 bg-gray-700 rounded-lg">
            <Calendar
              onChange={setFechaSeleccionada}
              value={fechaSeleccionada}
              className="calendar-dark"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-300">
            Selecciona una Mesa
          </label>
          <select
            value={mesaSeleccionada}
            onChange={(e) => setMesaSeleccionada(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            <option value="" disabled>
              Selecciona una mesa
            </option>
            <option value="1">Mesa 1</option>
            <option value="2">Mesa 2</option>
            <option value="3">Mesa 3</option>
            <option value="4">Mesa 4</option>
            <option value="5">Mesa 5</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-300">
            Motivo de la Reserva
          </label>
          <select
            value={motivoReserva}
            onChange={(e) => setMotivoReserva(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            <option value="" disabled>
              Selecciona un motivo
            </option>
            <option value="cumpleaños">Cumpleaños</option>
            <option value="ninguno">Sin motivo específico</option>
          </select>
        </div>

        <button
          onClick={confirmarReserva}
          className="w-full py-3 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-lg text-lg transition"
        >
          Confirmar Reserva
        </button>
      </div>

      <style jsx>{`
        .fade-slide-in {
          animation: fadeInSlideDown 900ms ease-out forwards;
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
}
