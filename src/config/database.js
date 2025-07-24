import { PrismaClient } from '@prisma/client';

// Singleton pour PrismaClient
let prisma;

if (!global.prisma) {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
  global.prisma = prisma;
} else {
  prisma = global.prisma;
}

export default prisma;

// Fonction pour tester la connexion
export async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à la base de données MongoDB réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données MongoDB:', error);
    process.exit(1);
  }
} 