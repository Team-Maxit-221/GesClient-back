import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

// Ajout de la logique SERVER_KEY
const SERVER_KEY = process.env.SERVER_KEY || 'local';
const LOCAL_URL = process.env.LOCAL_SERVER_URL || 'http://localhost:3002';
const PROD_URL = process.env.PROD_SERVER_URL || 'https://quincaillerie-latest.onrender.com';

const serverUrl = SERVER_KEY === 'prod' ? PROD_URL : LOCAL_URL;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Gesclient',
    version: '1.0.0',
    description: 'Documentation de l’API Gesclient (Max221)',
    contact: {
      name: 'Max221',
      email: 'contact@max221.com',
    },
  },
  servers: [
    {
      url: serverUrl,
      description: 'Serveur API',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Role: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Gestionnaire' },
          description: { type: 'string', example: 'Peut gérer les catégories et produits' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Utilisateur: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          email: { type: 'string', example: 'user@email.com' },
          nom: { type: 'string', example: 'Barro' },
          prenom: { type: 'string', example: 'Issa' },
          isActive: { type: 'boolean', example: true },
          roleId: { type: 'integer', example: 1 },
          role: { $ref: '#/components/schemas/Role' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Categorie: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nom: { type: 'string', example: 'Fer' },
          description: { type: 'string', example: 'Catégorie de fers' },
          isArchived: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      SousCategorie: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nom: { type: 'string', example: 'Fer de 8' },
          description: { type: 'string', example: 'Sous-catégorie de fers' },
          categorieId: { type: 'integer', example: 1 },
          isArchived: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Produit: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nom: { type: 'string', example: 'Fer de 8 - barre' },
          description: { type: 'string', example: 'Barre de fer de 8mm' },
          prix: { type: 'number', example: 3500 },
          stock: { type: 'integer', example: 100 },
          imagePath: { type: 'string', example: '/uploads/fer8.jpg' },
          sousCategorieId: { type: 'integer', example: 1 },
          isArchived: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Fournisseur: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          numero: { type: 'string', example: 'F001' },
          nom: { type: 'string', example: 'Fournisseur A' },
          email: { type: 'string', example: 'fournisseur@email.com' },
          telephone: { type: 'string', example: '771234567' },
          adresse: { type: 'string', example: 'Dakar' },
          isArchived: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      }
    }
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec; 