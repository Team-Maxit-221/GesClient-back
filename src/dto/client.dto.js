import { ValidationException } from '../exceptions/AppException.js';

export function validateClientDto(data) {
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
} 