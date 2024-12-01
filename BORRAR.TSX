import React, { useState, useEffect } from 'react';

const SliderInicio = () => {
  // Definir una imagen fija para cada día
  const slides = [
    {
      day: "Jueves",
      imageUrl: "https://images.unsplash.com/photo-1731082417879-710ff0c868ae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Reemplaza con la URL de la imagen para el jueves
    },
    {
      day: "Viernes",
      imageUrl: "https://images.unsplash.com/photo-1720048171527-208cb3e93192?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Reemplaza con la URL de la imagen para el viernes
    },
    {
      day: "Sábado",
      imageUrl: "https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Reemplaza con la URL de la imagen para el sábado
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambiar al siguiente slide automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, [slides.length]);

  // Funciones para navegar entre slides
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden transform transition-all duration-[900ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${slide.imageUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            width: '100vw', // Ancho completo de la pantalla
            height: '100vh', // Altura completa de la pantalla
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h2 className="text-5xl font-bold text-white">{slide.day}</h2>
          </div>
        </div>
      ))}

      {/* Botones de navegación para PC */}
      <button onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10">
        &#10094;
      </button>
      <button onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10">
        &#10095;
      </button>
    </div>
  );
};

export default SliderInicio;
