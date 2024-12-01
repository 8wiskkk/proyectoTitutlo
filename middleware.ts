import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Importamos el tipo correcto
import { getAuth } from "@clerk/nextjs/server"; // Clerk espera este método

export default async function middleware(req: NextRequest) {
  // Obtener los datos de autenticación desde Clerk
  const auth = getAuth(req); // Aseguramos que `auth` no sea `null`
  const { userId } = auth;

  // Si no hay usuario autenticado y la ruta no es pública, redirigir a la página de login
  if (!userId && !isPublicRoute(req.nextUrl.pathname)) {
    const signInUrl = new URL("/signin", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Verificación de roles para rutas protegidas, como "/admin"
  if (req.nextUrl.pathname.startsWith("/admin") && userId) {
    try {
      // Obtener los datos del usuario desde Clerk
      const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
        },
      }).then((res) => res.json());

      // Verificar si el usuario tiene el rol de administrador
      const isAdmin = user.organization_memberships?.some(
        (membership: any) => membership.role === "org:admin"
      );

      if (!isAdmin) {
        // Si no es admin, redirigir a una página de acceso denegado
        const unauthorizedUrl = new URL("/403", req.url);
        return NextResponse.redirect(unauthorizedUrl);
      }
    } catch (error) {
      console.error("Error al verificar rol de admin:", error);
      const errorPage = new URL("/500", req.url); // Página de error en caso de fallo en la verificación
      return NextResponse.redirect(errorPage);
    }
  }

  // Continuar con la ejecución si no hay problemas
  return NextResponse.next();
}

// Función para definir rutas públicas
function isPublicRoute(pathname: string) {
  const publicRoutes = ["/", "/signin", "/signup"];
  return publicRoutes.some((route) => pathname.startsWith(route));
}

// Configuración del middleware
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"], // Aplica el middleware a las rutas que no tengan extensiones (archivos estáticos)
};
