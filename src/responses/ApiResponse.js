class ApiResponse {
  static success(res, data = null, message = 'Opération réussie', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static error(res, message = 'Une erreur est survenue', statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString()
    });
  }

  static created(res, data = null, message = 'Ressource créée avec succès') {
    // Toujours 201 pour une création
    return this.success(res, data, message, 201);
  }

  static noContent(res, message = 'Aucun contenu') {
    return this.success(res, null, message, 204);
  }

  static badRequest(res, message = 'Requête invalide', errors = null) {
    return this.error(res, message, 400, errors);
  }

  static unauthorized(res, message = 'Non autorisé') {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = 'Accès interdit') {
    return this.error(res, message, 403);
  }

  static notFound(res, message = 'Ressource non trouvée') {
    return this.error(res, message, 404);
  }

  static conflict(res, message = 'Conflit de données', errors = null) {
    return this.error(res, message, 409, errors);
  }

  static validationError(res, errors) {
    return this.error(res, 'Erreur de validation', 422, errors);
  }
}

export default ApiResponse; 