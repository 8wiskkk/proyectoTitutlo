import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getAuth } from "@clerk/nextjs/server"; // Clerk espera este método
import { users } from "@clerk/clerk-sdk-node";

export async function POST(request: Request) {
  try {
    const { carrito } = await request.json();

    if (!carrito) {
      return NextResponse.json(
        { success: false, error: "Datos faltantes" },
        { status: 400 }
      );
    }

    // Extrae los headers
    const headers = Object.fromEntries(request.headers.entries());
    console.log("Headers:", headers); // Imprime los headers de la solicitud

    // Obtén los datos de autenticación
    const auth = getAuth({ headers } as any); // Llamada a getAuth con los headers
    console.log("Auth Data:", auth); // Aquí imprimes el auth recibido para ver los datos del usuario

    // Verifica si no existe el userId
    if (!auth || !auth.userId) {
      return NextResponse.json(
        { success: false, error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    // Intenta obtener el usuario de Clerk
    const user = await users.getUser(auth.userId).catch((error) => {
      console.error("Error al obtener el usuario:", error);
      return null; // Si no se puede obtener el usuario, retorna null
    });

    // Si no se obtiene el usuario
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const nombreUsuario = user?.fullName || user?.emailAddress || "Usuario desconocido";

    for (const producto of carrito) {
      // 1. Verifica que la bebida existe
      const bebida = await prisma.bebidasDisponibles.findUnique({
        where: { id: producto.id },
      });

      if (!bebida) {
        return NextResponse.json(
          { success: false, error: `La bebida con ID ${producto.id} no existe.` },
          { status: 404 }
        );
      }

      if (bebida.cantidadDisponible < producto.cantidad) {
        return NextResponse.json(
          { success: false, error: `Cantidad insuficiente para ${bebida.nombre}.` },
          { status: 400 }
        );
      }

      // 2. Actualiza la cantidad disponible de la bebida
      await prisma.bebidasDisponibles.update({
        where: { id: producto.id },
        data: {
          cantidadDisponible: {
            decrement: producto.cantidad,
          },
        },
      });

      // 3. Crea una entrada en la tabla BebidasVendidas
      await prisma.bebidasVendidas.create({
        data: {
          idBebida: producto.id,
          cantidadVendida: producto.cantidad,
          totalVenta: producto.cantidad * producto.precio,
          codigoCompra: `${producto.id}-${Date.now()}`,
          nombreUsuario: nombreUsuario,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en la compra:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
