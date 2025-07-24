import NumeroClientService from '../services/NumeroClientService.js';
import ApiResponse from '../responses/ApiResponse.js';
import { ValidationException, NotFoundException } from '../exceptions/AppException.js';
import { validateNumeroClientCreateDto, validateNumeroClientSearchDto } from '../dto/numeroClient.dto.js';

export default class NumeroClientController {
  static async searchByPhoneNumber(req, res, next) {
    try {
      validateNumeroClientSearchDto(req.query);
      const { phoneNumber } = req.query;
      const client = await NumeroClientService.findByPhoneNumber(phoneNumber);
      return ApiResponse.success(res, client, 'Client trouvé');
    } catch (error) {
      if (error instanceof ValidationException) {
        return ApiResponse.validationError(res, error.message);
      }
      if (error instanceof NotFoundException) {
        return ApiResponse.notFound(res, error.message);
      }
      return ApiResponse.error(
        res,
        'Erreur interne du serveur. Le numéro doit être un numéro Orange Sénégal valide (9 chiffres, commence par 77, 78, 76, 70 ou 33).',
        500,
        error.message || error
      );
    }
  }

  static async create(req, res, next) {
    try {
      validateNumeroClientCreateDto(req.body);
      const client = await NumeroClientService.createNumeroClient(req.body);
      return ApiResponse.created(res, client, 'NumeroClient créé avec succès');
    } catch (error) {
      if (error instanceof ValidationException) {
        return ApiResponse.validationError(res, error.message);
      }
      return ApiResponse.error(
        res,
        'Erreur lors de la création du numéro client.',
        500,
        error.message || error
      );
    }
  }

  static async getAll(req, res, next) {
    try {
      const clients = await NumeroClientService.getAllNumeroClients();
      return ApiResponse.success(res, clients, 'Liste des NumeroClients');
    } catch (error) {
      return ApiResponse.error(
        res,
        'Erreur lors de la récupération des numéros clients.',
        500,
        error.message || error
      );
    }
  }

  static async getById(req, res, next) {
    try {
      const client = await NumeroClientService.getNumeroClientById(req.params.id);
      return ApiResponse.success(res, client, 'Détail du NumeroClient');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ApiResponse.notFound(res, error.message);
      }
      return ApiResponse.error(
        res,
        'Erreur lors de la récupération du numéro client.',
        500,
        error.message || error
      );
    }
  }

  static async update(req, res, next) {
    try {
      const client = await NumeroClientService.updateNumeroClient(req.params.id, req.body);
      return ApiResponse.success(res, client, 'NumeroClient mis à jour');
    } catch (error) {
      if (error instanceof ValidationException) {
        return ApiResponse.validationError(res, error.message);
      }
      if (error instanceof NotFoundException) {
        return ApiResponse.notFound(res, error.message);
      }
      return ApiResponse.error(
        res,
        'Erreur lors de la mise à jour du numéro client.',
        500,
        error.message || error
      );
    }
  }

  static async delete(req, res, next) {
    try {
      await NumeroClientService.deleteNumeroClient(req.params.id);
      return ApiResponse.success(res, null, 'NumeroClient supprimé');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ApiResponse.notFound(res, error.message);
      }
      return ApiResponse.error(
        res,
        'Erreur lors de la suppression du numéro client.',
        500,
        error.message || error
      );
    }
  }
} 