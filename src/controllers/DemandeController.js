import DemandeService from '../services/DemandeService.js';
import ApiResponse from '../responses/ApiResponse.js';

export default class DemandeController {
  static async listByAccount(req, res, next) {
    try {
      const { account } = req.query;
      if (!account) {
        return ApiResponse.badRequest(res, 'Le compte principal est requis');
      }
      const demandes = await DemandeService.listByAccount(account);
      return ApiResponse.success(res, demandes, 'Demandes trouvées');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const demande = await DemandeService.createDemande(req.body);
      return ApiResponse.created(res, demande, 'Demande créée avec succès');
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const demandes = await DemandeService.getAllDemandes();
      return ApiResponse.success(res, demandes, 'Liste des demandes');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const demande = await DemandeService.getDemandeById(req.params.id);
      return ApiResponse.success(res, demande, 'Détail de la demande');
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const demande = await DemandeService.updateDemande(req.params.id, req.body);
      return ApiResponse.success(res, demande, 'Demande mise à jour');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await DemandeService.deleteDemande(req.params.id);
      return ApiResponse.success(res, null, 'Demande supprimée');
    } catch (error) {
      next(error);
    }
  }

  static async listJournalizedByAccount(req, res, next) {
    try {
      const { account } = req.query;
      if (!account) {
        return ApiResponse.badRequest(res, 'Le compte principal est requis');
      }
      const demandes = await DemandeService.listJournalizedByAccount(account);
      return ApiResponse.success(res, demandes, 'Demandes journalisées trouvées');
    } catch (error) {
      return ApiResponse.error(res, 'Erreur lors de la récupération des demandes journalisées.', 500, error.message || error);
    }
  }
} 