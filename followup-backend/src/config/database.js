/**
 * Configuration de la connexion à la base de données MySQL
 * FollowUp - CHU de Montpellier
 * 
 * Conformité IEC 62304 : Classe B
 * @module config/database
 */

const mysql = require('mysql2/promise');
const logger = require('../utils/logger');

// Pool de connexions MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'followup',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

/**
 * Teste la connexion à la base de données
 * @returns {Promise<boolean>} true si connexion réussie
 */
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    logger.info('✓ Connexion à la base de données MySQL établie');
    connection.release();
    return true;
  } catch (error) {
    logger.error('✗ Erreur de connexion à la base de données:', error.message);
    throw error;
  }
}

/**
 * Ferme le pool de connexions
 */
async function closePool() {
  try {
    await pool.end();
    logger.info('Pool de connexions MySQL fermé');
  } catch (error) {
    logger.error('Erreur lors de la fermeture du pool:', error.message);
  }
}

module.exports = {
  pool,
  testConnection,
  closePool
};
