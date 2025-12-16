-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "Pictures" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" TEXT NOT NULL DEFAULT 'gg';
