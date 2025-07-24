import { ValidationException } from '../exceptions/AppException.js';

export function validateNumeroClientCreateDto(data) {
  if (!data || typeof data !== 'object') {
    throw new ValidationException('Aucune donnée reçue.');
  }
  if (!data.phoneNumber || typeof data.phoneNumber !== 'string') {
    throw new ValidationException('Le numéro de téléphone est requis.');
  }
  // La validation stricte du numéro sera faite dans le service
  if (!data.cni || typeof data.cni !== 'string') {
    throw new ValidationException('Le CNI est requis.');
  }
  if (!data.status || !['Active', 'Inactive'].includes(data.status)) {
    throw new ValidationException('Le statut doit être "Active" ou "Inactive".');
  }
  if (!data.clientId || typeof data.clientId !== 'string') {
    throw new ValidationException('L\'identifiant du client est requis.');
  }
}

export function validateNumeroClientSearchDto(query) {
  if (!query.phoneNumber || typeof query.phoneNumber !== 'string') {
    throw new ValidationException('Le numéro de téléphone est requis pour la recherche.');
  }
} 