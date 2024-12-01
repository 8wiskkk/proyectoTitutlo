import React, { useState } from "react";

const SliderInicio = () => {
  const slides = [
    {
      day: "Bienvenidos",
      imageUrl:
        "https://scontent-scl2-1.xx.fbcdn.net/v/t1.6435-9/89973889_2513687612228750_3572657417193783296_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeGlZjgLd2K4W-Ut276-NKutEvpwzd2ruEUS-nDN3au4RUe-5WyYtrFQ7-Pk7uL3Pc4pu-ScYYiqq636ButwiJn0&_nc_ohc=uhUoUqoV2pYQ7kNvgG28YpI&_nc_zt=23&_nc_ht=scontent-scl2-1.xx&_nc_gid=AFP4Uej2yjqCx96VqW5iMWM&oh=00_AYAQy9XAarSnnfzGMNaG3v9uPE8uOks_2cjMAAiC40t_EQ&oe=67733CD7",
      content: (
        <div className="text-center text-white mt-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¡Bienvenidos a Savages Talca!
          </h1>
          <p className="text-lg md:text-2xl font-semibold mb-4">
            Multiespacio - #SabemosDeFiesta
          </p>
          <p className="text-sm md:text-lg mb-4">
            Te invitamos a formar parte de nuestra comunidad, donde celebramos
            todos tus logros. Trae a tus amigos, reserva tu lugar y disfruta de
            una noche inolvidable con nosotros.
          </p>
          <p className="text-sm md:text-lg mb-4">
            Para reservas, contáctanos al teléfono +56 9 2604 1717 o envía un
            correo a contacto@savages.cl.
          </p>
          <p className="text-sm md:text-lg mb-4">¡No te lo puedes perder!</p>
        </div>
      ),
    },
    {
      day: "Servicios",
      imageUrl:
        "https://scontent-scl2-1.xx.fbcdn.net/v/t1.6435-9/90470377_2513687452228766_7356973120541949952_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeE2LTxvCIT84iL6zXZtuwr41WeSRDx5_cfVZ5JEPHn9xyR9AUq9CAco919ohoNjWvkI3CS9cMKB1wRd5G7JLWzd&_nc_ohc=2mxAXIUApA4Q7kNvgGG-2HR&_nc_zt=23&_nc_ht=scontent-scl2-1.xx&_nc_gid=Ax_0qojX6aC-53g0joqbxEZ&oh=00_AYBMTR0agUP_WKWGrkU7itIURjypLZwfVbX623GMdhHaSw&oe=677336FC",
      content: (
        <div className="text-center text-white mt-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-lg md:text-2xl font-semibold mb-4">
            Multiespacio para Eventos
          </p>
          <ul className="list-disc list-inside text-sm md:text-lg mb-4">
            <li>Fiestas Universitarias</li>
            <li>Eventos Empresariales</li>
            <li>Cumpleaños</li>
          </ul>
          <p className="text-sm md:text-lg mb-4">
            Promocionamos tu evento con DJ, regalos sorpresa, espacio reservado
            y lista de invitados.
          </p>
          <p className="text-sm md:text-lg mb-4">
            Contáctanos al +56 9 2604 1717 o a contacto@savages.cl.
          </p>
        </div>
      ),
    },
    {
      day: "Promociones",
      imageUrl:
        "https://scontent-scl2-1.xx.fbcdn.net/v/t1.6435-9/89227968_2503932443204267_5350283697415258112_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeGOxA0qbE3DgL94LyV7Tqi56b5HjmPcHwPpvkeOY9wfAwBE3A2WpHV-V_7z4CEEiLqUMkNlUl4LOODP1JO-DRs6&_nc_ohc=67_AY_J-BJMQ7kNvgGGmuQJ&_nc_zt=23&_nc_ht=scontent-scl2-1.xx&_nc_gid=A1QRFWpqKKAnqcR4R6ne7bN&oh=00_AYC20ZByNpMGo9KEAHbCwRyRtX82uo9W0QqQv-fvnyfWTg&oe=67733E57",
      content: (
        <div className="text-center text-white mt-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Promociones Especiales
          </h1>
          <ul className="list-disc list-inside text-sm md:text-lg mb-4">
            <li>
              Mujeres mayores de 18 años: Entrada gratuita hasta las 00:00
              horas.
            </li>
            <li>
              Hombres mayores de 25 años: Entrada gratuita hasta la 01:00 de la
              noche.
            </li>
          </ul>
          <p className="text-sm md:text-lg mb-4">
            Entrada general con cover de $10.000.
          </p>
          <p className="text-sm md:text-lg mb-4">
            ¡No te pierdas esta oportunidad de disfrutar en Savage!
          </p>
        </div>
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div>
      {/* Slider */}
      <div className="relative w-screen h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${
              index === currentIndex ? "fade-slide-in" : "fade-slide-out"
            }`}
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {slide.day}
              </h2>
            </div>
          </div>
        ))}
        {/* Navigation */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
        >
          &#10094;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
        >
          &#10095;
        </button>
      </div>
      {/* Content */}
      <div className="w-screen bg-gray-900 py-10">
        <div className="max-w-4xl mx-auto">{slides[currentIndex].content}</div>
      </div>
      <style jsx>{`
        .fade-slide-in {
          animation: fadeInSlideDown 900ms ease-out forwards;
        }
        .fade-slide-out {
          opacity: 0;
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

export default SliderInicio;
