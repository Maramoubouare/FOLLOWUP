/**
 * Modèle SuiviIncident - Suivi des actions sur incidents
 * FollowUp - CHU de Montpellier
 * 
 * Conformité IEC 62304 : Traçabilité des actions (Classe B)
 * @module models/SuiviIncident
 */

const { pool } = require('../config/database');
const logger = require('../utils/logger');

class SuiviIncident {
  /**
   * Ajouter un suivi à un incident
   * 
   * @param {number} incidentId - ID de l'incident
   * @param {object} suiviData - Données du suivi
   * @returns {Promise<object>} Suivi créé
   */
  static async create(incidentId, suiviData) {
    const { dateSuivi, actionsPrises, idMedecin } = suiviData;

    const query = `
      INSERT INTO SUIVIINCIDENT (
        dateSuivi,
        actionsPrises,
        idIncident,
        idMedecin
      ) VALUES (?, ?, ?, ?)
    `;

    try {
      const [result] = await pool.execute(query, [
        dateSuivi,
        actionsPrises,
        incidentId,
        idMedecin
      ]);

      logger.audit('CREATE_SUIVI_INCIDENT', {
        suiviId: result.insertId,
        incidentId,
        medecinId: idMedecin
      }, idMedecin);

      return {
        id: result.insertId,
        ...suiviData,
        idIncident: incidentId
      };
    } catch (error) {
      logger.error('Erreur lors de la création du suivi:', error);
      throw error;
    }
  }

  /**
   * Récupérer tous les suivis d'un incident
   * 
   * @param {number} incidentId - ID de l'incident
   * @returns {Promise<array>} Liste des suivis
   */
  static async findByIncidentId(incidentId) {
    const query = `
      SELECT 
        si.*,
        m.nom as medecinNom,
        m.prenom as medecinPrenom,
        m.specialite as medecinSpecialite
      FROM SUIVIINCIDENT si
      LEFT JOIN MEDECIN m ON si.idMedecin = m.id
      WHERE si.idIncident = ?
      ORDER BY si.dateSuivi DESC
    `;

    try {
      const [rows] = await pool.execute(query, [incidentId]);
      return rows;
    } catch (error) {
      logger.error(`Erreur lors de la récupération des suivis de l'incident ${incidentId}:`, error);
      throw error;
    }
  }

  /**
   * Vérifier si un incident existe
   * 
   * @param {number} incidentId - ID de l'incident
   * @returns {Promise<boolean>} true si existe
   */
  static async incidentExists(incidentId) {
    const query = 'SELECT id FROM INCIDENT WHERE id = ?';

    try {
      const [rows] = await pool.execute(query, [incidentId]);
      return rows.length > 0;
    } catch (error) {
      logger.error(`Erreur lors de la vérification de l'incident ${incidentId}:`, error);
      throw error;
    }
  }
}

module.exports = SuiviIncident;
