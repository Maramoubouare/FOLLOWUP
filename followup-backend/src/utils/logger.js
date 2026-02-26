/**
 * Configuration du système de logging
 * FollowUp - CHU de Montpellier
 * 
 * Conformité IEC 62304 : Traçabilité obligatoire
 * @module utils/logger
 */

const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Créer le dossier logs s'il n'existe pas
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Format personnalisé pour les logs
 */
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

/**
 * Logger Winston configuré pour FollowUp
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: customFormat,
  defaultMeta: { 
    service: 'followup-incidents',
    version: '1.0.0'
  },
  transports: [
    // Fichier pour tous les logs
    new winston.transports.File({ 
      filename: path.join(logsDir, 'followup.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Fichier séparé pour les erreurs
    new winston.transports.File({ 
      filename: path.join(logsDir, 'errors.log'), 
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});

/**
 * En développement, afficher aussi dans la console
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

/**
 * Log d'audit pour les opérations critiques
 * Conformité IEC 62304 - Classe B
 * 
 * @param {string} action - Action effectuée
 * @param {object} data - Données associées
 * @param {string} userId - ID utilisateur (médecin)
 */
logger.audit = function(action, data, userId = null) {
  this.info('AUDIT', {
    action,
    data,
    userId,
    timestamp: new Date().toISOString()
  });
};

module.exports = logger;
