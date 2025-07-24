import { Router } from 'express';
import LogController from '../controllers/LogController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Gestion des logs (audit, debug)
 */

/**
 * @swagger
 * /api/logs:
 *   post:
 *     summary: Créer un log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *               - message
 *             properties:
 *               action:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Log créé avec succès
 *       422:
 *         description: Données invalides
 */
router.post('/', LogController.create);

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Liste tous les logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Liste des logs
 */
router.get('/', LogController.getAll);

/**
 * @swagger
 * /api/logs/{id}:
 *   get:
 *     summary: Récupère un log par son ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détail du log
 *       404:
 *         description: Log non trouvé
 */
router.get('/:id', LogController.getById);

/**
 * @swagger
 * /api/logs/{id}:
 *   put:
 *     summary: Met à jour un log
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Log mis à jour
 *       404:
 *         description: Log non trouvé
 */
router.put('/:id', LogController.update);

/**
 * @swagger
 * /api/logs/{id}:
 *   delete:
 *     summary: Supprime un log
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Log supprimé
 *       404:
 *         description: Log non trouvé
 */
router.delete('/:id', LogController.delete);

export default router; 