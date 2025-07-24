import { ValidationException } from '../exceptions/AppException.js';

export function validateDemandeDto(data) {
  if (!data || typeof data !== 'object') {
    throw new ValidationException('Aucune donnée reçue.');
  }
  if (!data.type || typeof data.type !== 'string') {
    throw new ValidationException('Le type de demande est requis.');
  }
  if (!data.content || typeof data.content !== 'string') {
    throw new ValidationException('Le contenu de la demande est requis.');
  }
  if (!data.status || typeof data.status !== 'string') {
    throw new ValidationException('Le statut de la demande est requis.');
  }
  if (!data.account || typeof data.account !== 'string') {
    throw new ValidationException('Le compte principal est requis.');
  }
} 