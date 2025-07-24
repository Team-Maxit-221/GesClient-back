import { Router } from 'express';
import ClientController from '../controllers/ClientController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gestion des clients Orange
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Créer un nouveau client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - cni
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               cni:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *       409:
 *         description: CNI déjà utilisée
 *       422:
 *         description: Données invalides
 */
router.post('/', ClientController.create);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Liste tous les clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Liste des clients
 */
router.get('/', ClientController.getAll);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Récupère un client par son ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détail du client
 *       404:
 *         description: Client non trouvé
 */
router.get('/:id', ClientController.getById);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Met à jour un client
 *     tags: [Clients]
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
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               cni:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client mis à jour
 *       404:
 *         description: Client non trouvé
 */
router.put('/:id', ClientController.update);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Supprime un client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client supprimé
 *       404:
 *         description: Client non trouvé
 */
router.delete('/:id', ClientController.delete);

export default router; 