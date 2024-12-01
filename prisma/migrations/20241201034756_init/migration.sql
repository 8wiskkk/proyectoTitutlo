/*
  Warnings:

  - The primary key for the `BebidasReclamadas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idReclamada` on the `BebidasReclamadas` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `BebidasReclamadas` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `BebidasVendidas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idVenta]` on the table `BebidasReclamadas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `BebidasReclamadas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `BebidasVendidas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BebidasReclamadas" DROP CONSTRAINT "BebidasReclamadas_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "BebidasVendidas" DROP CONSTRAINT "BebidasVendidas_idUsuario_fkey";

-- AlterTable
ALTER TABLE "BebidasReclamadas" DROP CONSTRAINT "BebidasReclamadas_pkey",
DROP COLUMN "idReclamada",
DROP COLUMN "idUsuario",
ADD COLUMN     "idReclamacion" SERIAL NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "BebidasReclamadas_pkey" PRIMARY KEY ("idReclamacion");

-- AlterTable
ALTER TABLE "BebidasVendidas" DROP COLUMN "idUsuario",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BebidasReclamadas_idVenta_key" ON "BebidasReclamadas"("idVenta");

-- AddForeignKey
ALTER TABLE "BebidasVendidas" ADD CONSTRAINT "BebidasVendidas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BebidasReclamadas" ADD CONSTRAINT "BebidasReclamadas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
