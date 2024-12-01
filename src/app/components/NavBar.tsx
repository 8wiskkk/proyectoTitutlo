import React from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

type NavBarProps = {
  active: string;
  setActive: (key: string) => void;
};

// Ítems del menú con íconos personalizados
const navItems = [
  {
    key: "home",
    name: "Inicio",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7m-2 2v7a2 2 0 002 2h3M9 21H5a2 2 0 01-2-2v-5a2 2 0 012-2h3m10 0h-4a2 2 0 00-2 2v5a2 2 0 002 2h4m0-10l2 2m-2-2l-7 7",
  },
  {
    key: "stats",
    name: "Ubicación",
    iconPath:
      "M12 2C8.686 2 6 4.686 6 8c0 5.25 6 12 6 12s6-6.75 6-12c0-3.314-2.686-6-6-6zm0 8a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    key: "reserva",
    name: "Reserva",
    iconPath:
      "M8 7V3m8 4V3M5 11h14m-1 10H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z",
  },
  {
    key: "carta",
    name: "Carta",
    iconPath:
      "M4 6h16M4 10h16M4 14h16M4 18h16",
  },
  {
    key: "carrito",
    name: "Carrito",
    iconPath:
      "M3 3h18l-2 11H5L3 3zm6 14a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z",
  },
];

// Botón de navegación reutilizable
function NavButton({
  isActive,
  name,
  iconPath,
  onClick,
}: {
  isActive: boolean;
  name: string;
  iconPath: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`Ir a ${name}`}
      className={`flex items-center space-x-2 transition-all duration-500 ease-in-out ${isActive
        ? "bg-gray-700 text-white rounded-full px-4 py-2 scale-110 shadow-xl"
        : "text-gray-400 px-4 py-2 scale-100"
        }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={isActive ? "text-white h-6 w-6" : "h-6 w-6 text-gray-500"}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
      {isActive && (
        <span className="transition-opacity duration-500 ease-in-out">
          {name}
        </span>
      )}
    </button>
  );
}

// Componente principal NavBar
export default function NavBar({ active, setActive }: NavBarProps) {
  const { isSignedIn, user } = useUser(); // Obtener información del usuario actual

  // Verificar si el usuario actual es "barra"
  const isBarra = user?.username === "barra";

  // Si es "barra", mostrar solo la sección especial
  const filteredNavItems = isBarra
    ? [
      {
        key: "admin-barra",
        name: "Panel Barra",
        iconPath:
          "M12 12l8-8m0 8l-8-8m8 8l-8 8m8-8l-8 8", // Ícono personalizado para "barra"
      },
    ]
    : isSignedIn
      ? navItems // Mostrar todas las opciones si está autenticado
      : navItems.filter((item) => item.key === "home" || item.key === "stats");

  return (
    <>
      {/* Navbar para escritorio */}
      <div className="hidden md:flex fixed top-0 left-0 w-full justify-between items-center px-8 py-4 bg-gray-900 shadow-lg z-10">
        <span className="text-xl font-semibold text-white">Savages</span>
        <div className="flex items-center space-x-6">
          {filteredNavItems.map(({ key, name, iconPath }) => (
            <NavButton
              key={key}
              isActive={active === key}
              name={name}
              iconPath={iconPath}
              onClick={() => setActive(key)}
            />
          ))}
          {/* Botón de Login o Logout */}
          {isSignedIn ? (
            <SignOutButton>
              <button className="text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 transition">
                Cerrar Sesión
              </button>
            </SignOutButton>
          ) : (
            <SignInButton>
              <button className="text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition">
                Iniciar Sesión
              </button>
            </SignInButton>
          )}
        </div>
      </div>

      {/* Navbar para móvil */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 py-3 flex justify-around items-center z-10 shadow-lg md:hidden">
        {filteredNavItems.map(({ key, name, iconPath }) => (
          <NavButton
            key={key}
            isActive={active === key}
            name={name}
            iconPath={iconPath}
            onClick={() => setActive(key)}
          />
        ))}
        {/* Botón de Login o Logout en móvil */}
        {isSignedIn ? (
          <SignOutButton>
            <button className="text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 transition">
              Cerrar Sesión
            </button>
          </SignOutButton>
        ) : (
          <SignInButton>
            <button className="text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition">
              Iniciar Sesión
            </button>
          </SignInButton>
        )}
      </nav>
    </>
  );
}
