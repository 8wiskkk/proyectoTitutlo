/*
  Warnings:

  - You are about to drop the `EntradasDisponibles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntradasUsadas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntradasVendidas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[codigoCompra]` on the table `BebidasVendidas` will be added. If there are existing duplicate values, this will fail.
  - The required column `codigoCompra` was added to the `BebidasVendidas` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `idUsuario` to the `BebidasVendidas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EntradasUsadas" DROP CONSTRAINT "EntradasUsadas_idVenta_fkey";

-- DropForeignKey
ALTER TABLE "EntradasVendidas" DROP CONSTRAINT "EntradasVendidas_idEntrada_fkey";

-- AlterTable
ALTER TABLE "BebidasVendidas" ADD COLUMN     "codigoCompra" TEXT NOT NULL,
ADD COLUMN     "idUsuario" TEXT NOT NULL;

-- DropTable
DROP TABLE "EntradasDisponibles";

-- DropTable
DROP TABLE "EntradasUsadas";

-- DropTable
DROP TABLE "EntradasVendidas";

-- CreateTable
CREATE TABLE "BebidasReclamadas" (
    "idReclamada" SERIAL NOT NULL,
    "idVenta" INTEGER NOT NULL,
    "fechaReclamacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUsuario" TEXT NOT NULL,

    CONSTRAINT "BebidasReclamadas_pkey" PRIMARY KEY ("idReclamada")
);

-- CreateIndex
CREATE UNIQUE INDEX "BebidasVendidas_codigoCompra_key" ON "BebidasVendidas"("codigoCompra");

-- AddForeignKey
ALTER TABLE "BebidasVendidas" ADD CONSTRAINT "BebidasVendidas_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BebidasReclamadas" ADD CONSTRAINT "BebidasReclamadas_idVenta_fkey" FOREIGN KEY ("idVenta") REFERENCES "BebidasVendidas"("idVenta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BebidasReclamadas" ADD CONSTRAINT "BebidasReclamadas_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
