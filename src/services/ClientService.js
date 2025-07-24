import prisma from '../config/database.js';
import { NotFoundException, ValidationException } from '../exceptions/AppException.js';
import { validateClientDto } from '../dto/client.dto.js';

function validateSenegalCNI(cni) {
  // Doit être composé de 17 chiffres
  if (!/^\d{17}$/.test(cni)) {
    throw new ValidationException('Le numéro CNI doit contenir exactement 17 chiffres.');
  }
  // Doit commencer par 1 ou 2
  if (!(cni.startsWith('1') || cni.startsWith('2'))) {
    throw new ValidationException('Le numéro CNI doit commencer par 1 ou 2.');
  }
  return cni;
}

export default class ClientService {
  static async createClient(data) {
    validateClientDto(data);
    data.cni = validateSenegalCNI(data.cni);
    return await prisma.client.create({ data });
  }

  static async getAllClients() {
    return await prisma.client.findMany({ include: { numeroClients: true } });
  }

  static async getClientById(id) {
    const client = await prisma.client.findUnique({ where: { id }, include: { numeroClients: true } });
    if (!client) throw new NotFoundException('Client non trouvé');
    return client;
  }

  static async updateClient(id, data) {
    if (data.cni) {
      data.cni = validateSenegalCNI(data.cni);
    }
    validateClientDto({ ...data, cni: data.cni });
    try {
      return await prisma.client.update({ where: { id }, data });
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