import prisma from '../config/database.js';
import { NotFoundException, ValidationException } from '../exceptions/AppException.js';
import { validateLogDto } from '../dto/log.dto.js';

export default class LogService {
  static async createLog(data) {
    validateLogDto(data);
    return await prisma.log.create({ data });
  }

  static async getAllLogs() {
    return await prisma.log.findMany({ orderBy: { createdAt: 'desc' } });
  }

  static async getLogById(id) {
    const log = await prisma.log.findUnique({ where: { id } });
    if (!log) throw new NotFoundException('Log non trouvé');
    return log;
  }

  static async updateLog(id, data) {
    validateLogDto(data);
    try {
      return await prisma.log.update({ where: { id }, data });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('Log non trouvé');
      throw new ValidationException(error.message);
    }
  }

  static async deleteLog(id) {
    try {
      await prisma.log.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('Log non trouvé');
      throw new ValidationException(error.message);
    }
  }
} 