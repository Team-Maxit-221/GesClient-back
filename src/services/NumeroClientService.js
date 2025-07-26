import prisma from '../config/database.js';
import { NotFoundException, ValidationException } from '../exceptions/AppException.js';
import { 
  validateNumeroClientCreateDto, 
  validateNumeroClientSearchDto,
  transformNumeroClientForDisplay,
  transformSearchResult,
  transformNumeroClientList
} from '../dto/numeroClient.dto.js';

function validateSenegalOrangeNumber(phoneNumber) {
  // Retirer le préfixe +221 ou 00221 si présent
  let num = phoneNumber.replace(/^\+221|^00221/, '');
  // Retirer les espaces éventuels
  num = num.replace(/\s+/g, '');
  // Doit être composé uniquement de chiffres
  if (!/^\d+$/.test(num)) {
    throw new ValidationException('Le numéro doit contenir uniquement des chiffres.');
  }
  // Doit faire 9 chiffres
  if (num.length !== 9) {
    throw new ValidationException('Le numéro doit contenir exactement 9 chiffres.');
  }
  // Préfixes mobiles Orange : 77, 78, 76, 70 ; Fixe Orange : 33
  const prefix = num.substring(0, 2);
  if (["77", "78", "76", "70"].includes(prefix)) {
    return num;
  } else if (num.startsWith("33")) {
    return num;
  } else {
    throw new ValidationException('Ce numéro n\'est pas un numéro Orange Sénégal valide.');
  }
}

export default class NumeroClientService {
  static async findByPhoneNumber(phoneNumber) {
    const num = validateNumeroClientSearchDto({ phoneNumber });
    const client = await prisma.numeroClient.findUnique({
      where: { phoneNumber: num },
      include: { client: true },
    });
    if (!client) throw new NotFoundException('Aucun client trouvé avec ce numéro');
    return transformSearchResult(client);
  }

  static async createNumeroClient(data) {
    await validateNumeroClientCreateDto(data);
    const num = validateSenegalOrangeNumber(data.phoneNumber);
    const created = await prisma.numeroClient.create({ 
      data: { ...data, phoneNumber: num },
      include: { client: true }
    });
    return transformNumeroClientForDisplay(created);
  }

  static async getAllNumeroClients() {
    const numeros = await prisma.numeroClient.findMany({ 
      include: { client: true }, 
      orderBy: { createdAt: 'desc' } 
    });
    return transformNumeroClientList(numeros);
  }

  static async getNumeroClientById(id) {
    const client = await prisma.numeroClient.findUnique({ 
      where: { id }, 
      include: { client: true } 
    });
    if (!client) throw new NotFoundException('NumeroClient non trouvé');
    return transformNumeroClientForDisplay(client);
  }

  static async updateNumeroClient(id, data) {
    if (data.phoneNumber) {
      data.phoneNumber = validateSenegalOrangeNumber(data.phoneNumber);
    }
    try {
      const updated = await prisma.numeroClient.update({ 
        where: { id }, 
        data,
        include: { client: true }
      });
      return transformNumeroClientForDisplay(updated);
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('NumeroClient non trouvé');
      throw new ValidationException(error.message);
    }
  }

  static async deleteNumeroClient(id) {
    try {
      await prisma.numeroClient.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('NumeroClient non trouvé');
      throw new ValidationException(error.message);
    }
  }
} 