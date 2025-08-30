import { ValidationException } from '../exceptions/AppException.js';
import prisma from '../config/database.js';

function validateSenegalOrangeNumber(phoneNumber) {
  // Retirer le préfixe +221 ou 00221 si présent
  let num = phoneNumber.replace(/^\+221|^00221/, '');
  num = num.replace(/\s+/g, '');
  if (!/^\d+$/.test(num)) {
    throw new ValidationException('Le numéro doit contenir uniquement des chiffres.');
  }
  if (num.length !== 9) {
    throw new ValidationException('Le numéro doit contenir exactement 9 chiffres.');
  }
  const prefix = num.substring(0, 2);
  if (["77", "78", "76", "70"].includes(prefix)) {
    return num;
  } else if (num.startsWith("33")) {
    return num;
  } else {
    throw new ValidationException('Ce numéro n\'est pas un numéro Orange Sénégal valide.');
  }
}

function validateCNI(cni) {
  if (!/^\d{13}$/.test(cni)) {
    throw new ValidationException('Le numéro CNI doit contenir exactement 13 chiffres.');
  }
  if (!(cni.startsWith('1') || cni.startsWith('2'))){
    throw new ValidationException('Le numéro CNI doit commencer par 1 ou 2.');
  }
}

// DTO pour la création
export async function validateNumeroClientCreateDto(data) {
  if (!data || typeof data !== 'object') {
    throw new ValidationException('Aucune donnée reçue.');
  }
  if (!data.phoneNumber || typeof data.phoneNumber !== 'string') {
    throw new ValidationException('Le numéro de téléphone est requis.');
  }
  validateSenegalOrangeNumber(data.phoneNumber);
  if (!data.cni || typeof data.cni !== 'string') {
    throw new ValidationException('Le CNI est requis.');
  }
  validateCNI(data.cni);
  if (!data.status || !['Active', 'Inactive'].includes(data.status)) {
    throw new ValidationException('Le statut doit être "Active" ou "Inactive".');
  }
  // Vérifier si le CNI existe déjà dans NumeroClient
  const existingNumeroClient = await prisma.numeroClient.findUnique({
    where: { cni: data.cni }
  });
  if (existingNumeroClient) {
    throw new ValidationException('Un numéro client avec ce CNI existe déjà.');
  }
  // Vérifier si le CNI existe dans Client
  const existingClient = await prisma.client.findUnique({
    where: { cni: data.cni }
  });
  if (!existingClient) {
    throw new ValidationException('Aucun client trouvé avec ce CNI.');
  }
}

// DTO pour la recherche
export function validateNumeroClientSearchDto(query) {
  if (!query.phoneNumber || typeof query.phoneNumber !== 'string') {
    throw new ValidationException('Le numéro de téléphone est requis pour la recherche.');
  }
  return validateSenegalOrangeNumber(query.phoneNumber);
}

// DTO pour l'affichage - transformation des données
export function transformNumeroClientForDisplay(numeroClient) {
  if (!numeroClient) return null;
  
  return {
    id: numeroClient.id,
    phoneNumber: numeroClient.phoneNumber,
    status: numeroClient.status,
    createdAt: numeroClient.createdAt,
    client: numeroClient.client ? {
      nom: numeroClient.client.nom,
      prenom: numeroClient.client.prenom,
      cni: numeroClient.client.cni
    } : null,
    // Masquer le CNI du NumeroClient car il est dans client
    _links: {
      self: `/api/numeros/${numeroClient.id}`,
      client: numeroClient.client ? `/api/clients/${numeroClient.client.id}` : null
    }
  };
}

// DTO pour la recherche avec formatage
export function transformSearchResult(numeroClient) {
  if (!numeroClient) return null;
  
  return {
    found: true,
    numero: {
      phoneNumber: numeroClient.phoneNumber,
      status: numeroClient.status,
      createdAt: numeroClient.createdAt
    },
    client: numeroClient.client ? {
      nom: numeroClient.client.nom,
      prenom: numeroClient.client.prenom,
      cni: numeroClient.client.cni
    } : null,
    message: `Client trouvé avec le numéro ${numeroClient.phoneNumber}`
  };
}

// DTO pour la liste - formatage multiple
export function transformNumeroClientList(numeroClients) {
  return numeroClients.map(transformNumeroClientForDisplay);
} 