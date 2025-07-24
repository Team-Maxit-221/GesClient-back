export class AppException extends Error {
  constructor(message, statusCode = 500, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationException extends AppException {
  constructor(message = 'Erreur de validation', errors = null) {
    super(message, 422, errors);
  }
}

export class NotFoundException extends AppException {
  constructor(message = 'Ressource non trouvée') {
    super(message, 404);
  }
}

export class UnauthorizedException extends AppException {
  constructor(message = 'Non autorisé') {
    super(message, 401);
  }
}

export class ForbiddenException extends AppException {
  constructor(message = 'Accès interdit') {
    super(message, 403);
  }
}

export class ConflictException extends AppException {
  constructor(message = 'Conflit de données', errors = null) {
    super(message, 409, errors);
  }
}

export class BusinessRuleException extends AppException {
  constructor(message = 'Règle métier violée') {
    super(message, 400);
  }
} 