import prisma from '../config/database.js';
import { NotFoundException, ValidationException } from '../exceptions/AppException.js';
import { 
  validateClientDto, 
  transformClientForDisplay,
  transformClientList
} from '../dto/client.dto.js';

function validateSenegalCNI(cni) {
  // Doit être composé de 13 chiffres
  if (!/^\d{13}$/.test(cni)) {
    throw new ValidationException('Le numéro CNI doit contenir exactement 13 chiffres.');
  }
  // Doit commencer par 1 ou 2
  if (!(cni.startsWith('1') || cni.startsWith('2'))) {
    throw new ValidationException('Le numéro CNI doit commencer par 1 ou 2.');
  }
  return cni;
}

export default class ClientService {
  static async createClient(data) {
    await validateClientDto(data);
    const created = await prisma.client.create({ 
      data,
      include: { numeroClients: true }
    });
    return transformClientForDisplay(created);
  }

  static async getAllClients() {
    const clients = await prisma.client.findMany({ 
      include: { numeroClients: true } 
    });
    return transformClientList(clients);
  }

  static async getClientById(id) {
    const client = await prisma.client.findUnique({ 
      where: { id }, 
      include: { numeroClients: true } 
    });
    if (!client) throw new NotFoundException('Client non trouvé');
    return transformClientForDisplay(client);
  }

  static async updateClient(id, data) {
    if (data.cni) {
      await validateClientDto({ ...data, cni: data.cni });
    }
    try {
      const updated = await prisma.client.update({ 
        where: { id }, 
        data,
        include: { numeroClients: true }
      });
      return transformClientForDisplay(updated);
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('Client non trouvé');
      throw new ValidationException(error.message);
    }
  }

  static async deleteClient(id) {
    try {
      await prisma.client.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('Client non trouvé');
      throw new ValidationException(error.message);
    }
  }
} 