import { ValidationException } from '../exceptions/AppException.js';

export function validateLogDto(data) {
  if (!data || typeof data !== 'object') {
    throw new ValidationException('Aucune donnée reçue.');
  }
  if (!data.action || typeof data.action !== 'string') {
    throw new ValidationException('L\'action du log est requise.');
  }
  if (!data.message || typeof data.message !== 'string') {
    throw new ValidationException('Le message du log est requis.');
  }
  if (data.demandeId && typeof data.demandeId !== 'string') {
    throw new ValidationException('L\'identifiant de la demande (demandeId) doit être une chaîne.');
  }
} 