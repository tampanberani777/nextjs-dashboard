import { PrismaClient } from '../../generated/prisma'; // ← ini penting!

const prisma = new PrismaClient();
export const sql = prisma;
