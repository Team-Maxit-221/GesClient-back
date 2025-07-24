import LogService from '../services/LogService.js';
import ApiResponse from '../responses/ApiResponse.js';

export default class LogController {
  static async create(req, res, next) {
    try {
      const log = await LogService.createLog(req.body);
      return ApiResponse.created(res, log, 'Log créé avec succès');
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const logs = await LogService.getAllLogs();
      return ApiResponse.success(res, logs, 'Liste des logs');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const log = await LogService.getLogById(req.params.id);
      return ApiResponse.success(res, log, 'Détail du log');
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const log = await LogService.updateLog(req.params.id, req.body);
      return ApiResponse.success(res, log, 'Log mis à jour');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await LogService.deleteLog(req.params.id);
      return ApiResponse.success(res, null, 'Log supprimé');
    } catch (error) {
      next(error);
    }
  }
} 