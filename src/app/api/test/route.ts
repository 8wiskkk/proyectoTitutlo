import { prisma } from "@/../lib/prisma"; // Ajusta la ruta según tu archivo prisma.ts
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Consulta las bebidas con cantidad disponible mayor a 0
        const bebidas = await prisma.bebidasDisponibles.findMany({
            where: {
                cantidadDisponible: {
                    gt: 0, // Filtra las bebidas con cantidadDisponible > 0
                },
            },
        });

        return NextResponse.json({ success: true, bebidas });
    } catch (error) {
        console.error("Error al consultar bebidas:", error);
        return NextResponse.json({ success: false, error: "Error al consultar bebidas" });
    }
}
