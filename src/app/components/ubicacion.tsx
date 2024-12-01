"use client";

import React from "react";

const Ubicacion = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-5xl font-extrabold mb-6 text-center">
        Nuestra Ubicación 📍
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
        Encuéntranos en el corazón de Talca. ¡Te esperamos!
      </p>
      <div className="w-full max-w-5xl aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13003.104202016739!2d-71.6273651!3d-35.4355773!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9665c6d3e7e1b73d%3A0x33d90e9362e2f5cf!2sSavages%20Multiespacio%20Talca!5e0!3m2!1ses-419!2scl!4v1732556371283!5m2!1ses-419!2scl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Ubicacion;