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

dotenv.config();

const app = express();
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
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📊 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});

export default app; 