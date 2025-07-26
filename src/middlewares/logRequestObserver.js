import prisma from '../config/database.js';

export default function logRequestObserver(req, res, next) {
  // On garde les infos nécessaires dès le début
  const start = Date.now();
  const { method, originalUrl } = req;
  // Récupération fiable de l'IP client
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip;
  // userId peut être récupéré d'un middleware d'auth plus tard
  const userId = null;

  // On observe la fin de la réponse
  res.on('finish', async () => {
    // On tente de récupérer le message de la réponse (si format JSON standard)
    let message = '';
    let success = false;
    try {
      // Si la réponse a été envoyée via res.json()
      if (res._body) {
        message = res._body.message || '';
        success = res._body.success === true;
      }
    } catch {}
    // Fallback : on tente de parser le body si possible
    if (!message && res.getHeader('content-type') && res.getHeader('content-type').includes('application/json')) {
      try {
        const body = res.locals.body;
        if (body && typeof body === 'object') {
          message = body.message || '';
          success = body.success === true;
        }
      } catch {}
    }
    // Si pas de message, on met le status
    if (!message) message = res.statusMessage || '';
    // Statut HTTP
    const statusCode = res.statusCode;
    // Log en base (en tâche de fond)
    prisma.log.create({
      data: {
        action: 'API_REQUEST',
        message,
        success: statusCode < 400,
        ip: typeof ip === 'string' ? ip : JSON.stringify(ip),
        userId,
        url: originalUrl,
        method,
        statusCode,
      }
    }).catch(() => {}); // On ne bloque jamais la réponse si le log échoue
  });

  // Pour capturer le body JSON envoyé par res.json()
  const originalJson = res.json;
  res.json = function (body) {
    res.locals.body = body;
    return originalJson.call(this, body);
  };

  next();
} 