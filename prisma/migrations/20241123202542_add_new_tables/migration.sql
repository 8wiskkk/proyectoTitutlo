-- CreateTable
CREATE TABLE "BebidasDisponibles" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "cantidadDisponible" INTEGER NOT NULL,
    "categoria" TEXT,

    CONSTRAINT "BebidasDisponibles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BebidasVendidas" (
    "idVenta" SERIAL NOT NULL,
    "idBebida" INTEGER NOT NULL,
    "cantidadVendida" INTEGER NOT NULL,
    "fechaVenta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalVenta" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BebidasVendidas_pkey" PRIMARY KEY ("idVenta")
);

-- CreateTable
CREATE TABLE "EntradasDisponibles" (
    "id" SERIAL NOT NULL,
    "nombreEvento" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "cantidadDisponible" INTEGER NOT NULL,
    "fechaEvento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntradasDisponibles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntradasVendidas" (
    "idVenta" SERIAL NOT NULL,
    "idEntrada" INTEGER NOT NULL,
    "cantidadVendida" INTEGER NOT NULL,
    "fechaVenta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalVenta" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EntradasVendidas_pkey" PRIMARY KEY ("idVenta")
);

-- CreateTable
CREATE TABLE "EntradasUsadas" (
    "idUsada" SERIAL NOT NULL,
    "idVenta" INTEGER NOT NULL,
    "fechaUso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntradasUsadas_pkey" PRIMARY KEY ("idUsada")
);

-- AddForeignKey
ALTER TABLE "BebidasVendidas" ADD CONSTRAINT "BebidasVendidas_idBebida_fkey" FOREIGN KEY ("idBebida") REFERENCES "BebidasDisponibles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntradasVendidas" ADD CONSTRAINT "EntradasVendidas_idEntrada_fkey" FOREIGN KEY ("idEntrada") REFERENCES "EntradasDisponibles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntradasUsadas" ADD CONSTRAINT "EntradasUsadas_idVenta_fkey" FOREIGN KEY ("idVenta") REFERENCES "EntradasVendidas"("idVenta") ON DELETE RESTRICT ON UPDATE CASCADE;
