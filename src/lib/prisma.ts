import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Error handling with proper typing
prisma.$use(async (params, next) => {
  try {
    return await next(params);
  } catch (error) {
    console.error('Prisma Error:', error);
    throw error;
  }
});

// Connection handling with proper error typing
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((error: Error) => {
    console.error('Failed to connect to database:', error);
  });