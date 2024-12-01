import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AdminBarraPage() {
  const { user } = useUser(); // Obtener el usuario autenticado
  const router = useRouter();

  // Verificar si el usuario autenticado es "barra"
  if (user?.username !== "barra") {
    // Redirige a la página 403 si no es el usuario correcto
    router.push("/403");
    return null; // Evita renderizar contenido mientras redirige
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Bienvenido al panel exclusivo de Barra
      </h1>
      <p className="text-lg text-gray-600">
        Aquí podrás gestionar configuraciones exclusivas para administradores.
      </p>
      {/* Configura la vista aquí según tus necesidades */}
    </div>
  );
}
