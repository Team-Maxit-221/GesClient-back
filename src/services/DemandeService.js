import prisma from '../config/database.js';
import { NotFoundException, ValidationException } from '../exceptions/AppException.js';
import { validateDemandeDto } from '../dto/demande.dto.js';

export default class DemandeService {
  static async listByAccount(account) {
    const demandes = await prisma.demande.findMany({
      where: { account },
      orderBy: { date: 'desc' },
    });
    if (!demandes || demandes.length === 0) throw new NotFoundException('Aucune demande trouvée pour ce compte');
    return demandes;
  }

  static async createDemande(data) {
    validateDemandeDto(data);
    return await prisma.demande.create({ data });
  }

  static async getAllDemandes() {
    return await prisma.demande.findMany({ orderBy: { date: 'desc' } });
  }

  static async getDemandeById(id) {
    const demande = await prisma.demande.findUnique({ where: { id } });
    if (!demande) throw new NotFoundException('Demande non trouvée');
    return demande;
  }

  static async updateDemande(id, data) {
    validateDemandeDto(data);
    try {
      return await prisma.demande.update({ where: { id }, data });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('Demande non trouvée');
      throw new ValidationException(error.message);
    }
  }

  static async deleteDemande(id) {
    try {
      await prisma.demande.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('Demande non trouvée');
      throw new ValidationException(error.message);
    }
  }

  static async listJournalizedByAccount(account) {
    // Récupérer toutes les demandes du compte avec leurs logs
    const demandes = await prisma.demande.findMany({
      where: { account },
      include: { logs: true },
    });
    // Ne garder que celles qui ont au moins un log
    return demandes.filter(d => d.logs && d.logs.length > 0);
  }
} 