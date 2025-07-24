import ClientService from '../services/ClientService.js';
import ApiResponse from '../responses/ApiResponse.js';

export default class ClientController {
  static async create(req, res, next) {
    try {
      const client = await ClientService.createClient(req.body);
      return ApiResponse.created(res, client, 'Client créé avec succès');
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const clients = await ClientService.getAllClients();
      return ApiResponse.success(res, clients, 'Liste des clients');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const client = await ClientService.getClientById(req.params.id);
      return ApiResponse.success(res, client, 'Détail du client');
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const client = await ClientService.updateClient(req.params.id, req.body);
      return ApiResponse.success(res, client, 'Client mis à jour');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await ClientService.deleteClient(req.params.id);
      return ApiResponse.success(res, null, 'Client supprimé');
    } catch (error) {
      next(error);
    }
  }
} 