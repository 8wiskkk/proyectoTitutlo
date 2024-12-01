/*
  Warnings:

  - You are about to drop the column `userId` on the `BebidasReclamadas` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `BebidasVendidas` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nombreUsuario` to the `BebidasReclamadas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreUsuario` to the `BebidasVendidas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BebidasReclamadas" DROP CONSTRAINT "BebidasReclamadas_userId_fkey";

-- DropForeignKey
ALTER TABLE "BebidasVendidas" DROP CONSTRAINT "BebidasVendidas_userId_fkey";

-- AlterTable
ALTER TABLE "BebidasReclamadas" DROP COLUMN "userId",
ADD COLUMN     "nombreUsuario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BebidasVendidas" DROP COLUMN "userId",
ADD COLUMN     "nombreUsuario" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";
