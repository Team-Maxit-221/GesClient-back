import { Router } from 'express';
import DemandeController from '../controllers/DemandeController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Demandes
 *   description: Gestion des demandes
 */

/**
 * @swagger
 * /api/demandes:
 *   get:
 *     summary: Liste les demandes par compte principal
 *     tags: [Demandes]
 *     parameters:
 *       - in: query
 *         name: account
 *         schema:
 *           type: string
 *         required: true
 *         description: Compte principal à rechercher
 *     responses:
 *       200:
 *         description: Liste des demandes
 *       404:
 *         description: Aucune demande trouvée
 */
router.get('/', DemandeController.listByAccount); // recherche par compte (déjà présent)

/**
 * @swagger
 * /api/demandes:
 *   post:
 *     summary: Créer une nouvelle demande
 *     tags: [Demandes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - content
 *               - status
 *               - account
 *             properties:
 *               type:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *               account:
 *                 type: string
 *     responses:
 *       201:
 *         description: Demande créée avec succès
 *       409:
 *         description: Compte déjà utilisé
 *       422:
 *         description: Données invalides
 */
router.post('/', DemandeController.create);

/**
 * @swagger
 * /api/demandes/all:
 *   get:
 *     summary: Liste toutes les demandes
 *     tags: [Demandes]
 *     responses:
 *       200:
 *         description: Liste des demandes
 */
router.get('/all', DemandeController.getAll);

/**
 * @swagger
 * /api/demandes/journalized:
 *   get:
 *     summary: Liste les demandes journalisées par compte principal
 *     tags: [Demandes]
 *     parameters:
 *       - in: query
 *         name: account
 *         schema:
 *           type: string
 *         required: true
 *         description: Compte principal à rechercher
 *     responses:
 *       200:
 *         description: Liste des demandes journalisées
 *       404:
 *         description: Aucune demande trouvée
 */
router.get('/journalized', DemandeController.listJournalizedByAccount);

/**
 * @swagger
 * /api/demandes/{id}:
 *   get:
 *     summary: Récupère une demande par son ID
 *     tags: [Demandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détail de la demande
 *       404:
 *         description: Demande non trouvée
 */
router.get('/:id', DemandeController.getById);

/**
 * @swagger
 * /api/demandes/{id}:
 *   put:
 *     summary: Met à jour une demande
 *     tags: [Demandes]
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
 *               type:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *               account:
 *                 type: string
 *     responses:
 *       200:
 *         description: Demande mise à jour
 *       404:
 *         description: Demande non trouvée
 */
router.put('/:id', DemandeController.update);

/**
 * @swagger
 * /api/demandes/{id}:
 *   delete:
 *     summary: Supprime une demande
 *     tags: [Demandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Demande supprimée
 *       404:
 *         description: Demande non trouvée
 */
router.delete('/:id', DemandeController.delete);

export default router; 