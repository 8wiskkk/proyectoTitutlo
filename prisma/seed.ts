import { prisma } from "../lib/prisma";

async function main() {
    await prisma.bebidasDisponibles.createMany({
        data: [
            { nombre: "Mojito", precio: 7000, cantidadDisponible: 50, categoria: "Clásicos" }, // 7.0 USD a CLP
            { nombre: "Margarita", precio: 8000, cantidadDisponible: 30, categoria: "Clásicos" }, // 8.0 USD a CLP
            { nombre: "Piña Colada", precio: 7500, cantidadDisponible: 20, categoria: "Clásicos" }, // 7.5 USD a CLP
        ],
    });
    console.log("Datos insertados.");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
