import { Router } from 'express';
import NumeroClientController from '../controllers/NumeroClientController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: NumeroClients
 *   description: Gestion des numéros clients Orange
 */

/**
 * @swagger
 * /api/numeros/search:
 *   get:
 *     summary: Recherche un client par numéro de téléphone
 *     tags: [NumeroClients]
 *     parameters:
 *       - in: query
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Numéro de téléphone à rechercher
 *     responses:
 *       200:
 *         description: Client trouvé
 *       404:
 *         description: Aucun client trouvé
 */
router.get('/search', NumeroClientController.searchByPhoneNumber);

/**
 * @swagger
 * /api/numeros:
 *   post:
 *     summary: Créer un nouveau numéro client
 *     tags: [NumeroClients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - cni
 *               - status
 *               - clientId
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               cni:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *               clientId:
 *                 type: string
 *     responses:
 *       201:
 *         description: NumeroClient créé avec succès
 *       409:
 *         description: Numéro déjà utilisé
 *       422:
 *         description: Données invalides
 */
router.post('/', NumeroClientController.create);

/**
 * @swagger
 * /api/numeros:
 *   get:
 *     summary: Liste tous les numéros clients
 *     tags: [NumeroClients]
 *     responses:
 *       200:
 *         description: Liste des numéros clients
 */
router.get('/', NumeroClientController.getAll);

/**
 * @swagger
 * /api/numeros/{id}:
 *   get:
 *     summary: Récupère un numéro client par son ID
 *     tags: [NumeroClients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détail du numéro client
 *       404:
 *         description: NumeroClient non trouvé
 */
router.get('/:id', NumeroClientController.getById);

/**
 * @swagger
 * /api/numeros/{id}:
 *   put:
 *     summary: Met à jour un numéro client
 *     tags: [NumeroClients]
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
 *               phoneNumber:
 *                 type: string
 *               cni:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *               clientId:
 *                 type: string
 *     responses:
 *       200:
 *         description: NumeroClient mis à jour
 *       404:
 *         description: NumeroClient non trouvé
 */
router.put('/:id', NumeroClientController.update);

/**
 * @swagger
 * /api/numeros/{id}:
 *   delete:
 *     summary: Supprime un numéro client
 *     tags: [NumeroClients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: NumeroClient supprimé
 *       404:
 *         description: NumeroClient non trouvé
 */
router.delete('/:id', NumeroClientController.delete);

export default router; 