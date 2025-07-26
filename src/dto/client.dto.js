import { ValidationException } from '../exceptions/AppException.js';
import prisma from '../config/database.js';

export async function validateClientDto(data) {
  if (!data || typeof data !== 'object') {
    throw new ValidationException('Aucune donnée reçue.');
  }
  if (!data.nom || typeof data.nom !== 'string' || data.nom.trim().length < 2) {
    throw new ValidationException('Le nom est requis et doit contenir au moins 2 caractères.');
  }
  if (!data.prenom || typeof data.prenom !== 'string' || data.prenom.trim().length < 2) {
    throw new ValidationException('Le prénom est requis et doit contenir au moins 2 caractères.');
  }
  if (!data.cni || typeof data.cni !== 'string') {
    throw new ValidationException('Le CNI est requis.');
  }
  // Validation structure CNI : 13 chiffres, commence par 1 ou 2
  if (!/^\d{13}$/.test(data.cni)) {
    throw new ValidationException('Le numéro CNI doit contenir exactement 13 chiffres.');
  }
  if (!(data.cni.startsWith('1') || data.cni.startsWith('2'))){
    throw new ValidationException('Le numéro CNI doit commencer par 1 ou 2.');
  }
  
  // Vérifier si le CNI existe déjà
  const existingClient = await prisma.client.findUnique({
    where: { cni: data.cni }
  });
  if (existingClient) {
    throw new ValidationException('Un client avec ce CNI existe déjà.');
  }
}

// DTO pour l'affichage - transformation des données
export function transformClientForDisplay(client) {
  if (!client) return null;
  
  return {
    id: client.id,
    nom: client.nom,
    prenom: client.prenom,
    cni: client.cni,
    numeroClients: client.numeroClients ? client.numeroClients.map(numero => ({
      id: numero.id,
      phoneNumber: numero.phoneNumber,
      status: numero.status,
      createdAt: numero.createdAt
    })) : [],
    _links: {
      self: `/api/clients/${client.id}`,
      numeros: `/api/numeros?clientId=${client.id}`
    }
  };
}

// DTO pour la liste - formatage multiple
export function transformClientList(clients) {
  return clients.map(transformClientForDisplay);
}

// DTO pour la recherche par CNI
export function validateClientSearchDto(query) {
  if (!query.cni || typeof query.cni !== 'string') {
    throw new ValidationException('Le CNI est requis pour la recherche.');
  }
  // Validation structure CNI
  if (!/^\d{13}$/.test(query.cni)) {
    throw new ValidationException('Le numéro CNI doit contenir exactement 13 chiffres.');
  }
  if (!(query.cni.startsWith('1') || query.cni.startsWith('2'))){
    throw new ValidationException('Le numéro CNI doit commencer par 1 ou 2.');
  }
  return query.cni;
} 