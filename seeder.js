import prisma from './src/config/database.js';
import bcrypt from 'bcryptjs';

async function main() {
  // 1. Création du rôle Admin
  const adminRole = await prisma.role.upsert({
    where: { libelle: 'Admin' },
    update: {},
    create: {
      libelle: 'Admin',
      description: 'Administrateur du système',
    },
  });
  console.log('Rôle Admin créé ou déjà existant :', adminRole);

  // 2. Création d'un utilisateur admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@gesclient.com' },
    update: {},
    create: {
      nom: 'Admin',
      prenom: 'Principal',
      email: 'admin@gesclient.com',
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });
  console.log('Utilisateur admin créé ou déjà existant :', adminUser);

  // 3. Création de clients
  const client1 = await prisma.client.upsert({
    where: { cni: '10000000000000001' },
    update: {},
    create: {
      nom: 'Sow',
      prenom: 'Fatou',
      cni: '10000000000000001',
    },
  });
  const client2 = await prisma.client.upsert({
    where: { cni: '20000000000000002' },
    update: {},
    create: {
      nom: 'Diop',
      prenom: 'Moussa',
      cni: '20000000000000002',
    },
  });
  console.log('Clients créés ou déjà existants :', client1, client2);

  // 4. Création de numéros clients liés aux clients
  const numero1 = await prisma.numeroClient.upsert({
    where: { phoneNumber: '771234567' },
    update: {},
    create: {
      phoneNumber: '771234567',
      cni: '10000000000000001',
      status: 'Active',
      clientId: client1.id,
    },
  });
  const numero2 = await prisma.numeroClient.upsert({
    where: { phoneNumber: '781234567' },
    update: {},
    create: {
      phoneNumber: '781234567',
      cni: '20000000000000002',
      status: 'Inactive',
      clientId: client2.id,
    },
  });
  console.log('Numéros clients créés ou déjà existants :', numero1, numero2);

  // 5. Création de demandes
  const demande1 = await prisma.demande.create({
    data: {
      type: 'creation',
      content: 'Demande de création de compte',
      status: 'En attente',
      account: 'COMPTE001',
    },
  });
  const demande2 = await prisma.demande.create({
    data: {
      type: 'modification',
      content: 'Demande de modification de numéro',
      status: 'Traitée',
      account: 'COMPTE002',
    },
  });
  console.log('Demandes créées :', demande1, demande2);

  // 6. Création de logs
  const log1 = await prisma.log.create({
    data: {
      action: 'SEED',
      message: 'Initialisation des données de base',
      demandeId: demande1.id,
    },
  });
  const log2 = await prisma.log.create({
    data: {
      action: 'TEST',
      message: 'Test de création de log',
      // log2 n'est pas lié à une demande
    },
  });
  console.log('Logs créés :', log1, log2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 