import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import prisma, { testConnection } from './config/database.js';
import numeroClientRouter from './routes/numeroClientRouter.js';
import demandeRouter from './routes/demandeRouter.js';
import logRouter from './routes/logRouter.js';
import clientRouter from './routes/clientRouter.js';
import logRequestObserver from './middlewares/logRequestObserver.js';
import { ValidationException, NotFoundException } from './exceptions/AppException.js';
import ApiResponse from './responses/ApiResponse.js';

dotenv.config();

const app = express();
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // ou l'IP de ton proxy
} else {
  app.set('trust proxy', false);
}
const PORT = process.env.PORT || 3000;

// Test de connexion à la base MongoDB
await testConnection();

// Middleware de sécurité
app.use(helmet());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4200',
  
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
});
app.use(limiter);

// Middleware pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use('/uploads', express.static('uploads'));

// Middleware pour logger les requêtes API
app.use(logRequestObserver);

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'API Gesclient - Système de gestion',
    version: '1.0.0',
    status: 'running'
  });
});

// Swagger uniquement
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/clients', clientRouter);
app.use('/api/demandes', demandeRouter);
app.use('/api/logs', logRouter);
app.use('/api/numeros', numeroClientRouter);

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Middleware de gestion d'erreurs global
app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  
  // Gestion des exceptions personnalisées
  if (err instanceof ValidationException) {
    return ApiResponse.badRequest(res, err.message);
  }
  
  if (err instanceof NotFoundException) {
    return ApiResponse.notFound(res, err.message);
  }
  
  // Erreurs Prisma
  if (err.code === 'P2002') {
    return ApiResponse.conflict(res, 'Une ressource avec ces données existe déjà');
  }
  
  if (err.code === 'P2025') {
    return ApiResponse.notFound(res, 'Ressource non trouvée');
  }
  
  // Erreur générique
  console.error(err.stack);
  return ApiResponse.error(res, 'Erreur interne du serveur', 500, 
    process.env.NODE_ENV === 'development' ? err.message : null
  );
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📊 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});

export default app; 