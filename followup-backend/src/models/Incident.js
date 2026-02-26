/**
 * Modèle Incident - Gestion des incidents implants cochléaires
 * FollowUp - CHU de Montpellier
 * 
 * Conformité IEC 62304 : Classe B (blessure possible)
 * @module models/Incident
 */

const { pool } = require('../config/database');
const logger = require('../utils/logger');

class Incident {
  /**
   * Créer un nouvel incident
   * 
   * @param {object} incidentData - Données de l'incident
   * @returns {Promise<object>} Incident créé avec son ID
   * @throws {Error} Si erreur de base de données
   */
  static async create(incidentData) {
    const {
      dateIncident,
      heureIncident,
      gravite,
      description,
      idPatient,
      idImplant = null,
      idProcesseur = null,
      idMedecin = null
    } = incidentData;

    const query = `
      INSERT INTO INCIDENT (
        dateIncident, 
        heureIncident, 
        gravite, 
        description, 
        idPatient, 
        idImplant, 
        idProcesseur, 
        idMedecin
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const [result] = await pool.execute(query, [
        dateIncident,
        heureIncident,
        gravite,
        description,
        idPatient,
        idImplant,
        idProcesseur,
        idMedecin
      ]);

      logger.audit('CREATE_INCIDENT', {
        incidentId: result.insertId,
        patientId: idPatient,
        gravite
      }, idMedecin);

      return {
        id: result.insertId,
        ...incidentData,
        dateCreation: new Date(),
        statut: 'Ouvert'
      };
    } catch (error) {
      logger.error('Erreur lors de la création de l\'incident:', error);
      throw error;
    }
  }

  /**
   * Récupérer un incident par son ID
   * 
   * @param {number} id - ID de l'incident
   * @returns {Promise<object|null>} Incident trouvé ou null
   */
  static async findById(id) {
    const query = `
      SELECT 
        i.*,
        p.nom as patientNom,
        p.prenom as patientPrenom,
        m.nom as medecinNom,
        m.prenom as medecinPrenom
      FROM INCIDENT i
      LEFT JOIN PATIENT p ON i.idPatient = p.id
      LEFT JOIN MEDECIN m ON i.idMedecin = m.id
      WHERE i.id = ?
    `;

    try {
      const [rows] = await pool.execute(query, [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      logger.error(`Erreur lors de la récupération de l'incident ${id}:`, error);
      throw error;
    }
  }

  /**
   * Récupérer tous les incidents d'un patient
   * 
   * @param {number} patientId - ID du patient
   * @returns {Promise<array>} Liste des incidents
   */
  static async findByPatientId(patientId) {
    const query = `
      SELECT 
        i.*,
        m.nom as medecinNom,
        m.prenom as medecinPrenom,
        COUNT(si.id) as nbSuivis
      FROM INCIDENT i
      LEFT JOIN MEDECIN m ON i.idMedecin = m.id
      LEFT JOIN SUIVIINCIDENT si ON si.idIncident = i.id
      WHERE i.idPatient = ?
      GROUP BY i.id
      ORDER BY i.dateIncident DESC, i.heureIncident DESC
    `;

    try {
      const [rows] = await pool.execute(query, [patientId]);
      return rows;
    } catch (error) {
      logger.error(`Erreur lors de la récupération des incidents du patient ${patientId}:`, error);
      throw error;
    }
  }

  /**
   * Mettre à jour un incident
   * 
   * @param {number} id - ID de l'incident
   * @param {object} updates - Champs à mettre à jour
   * @returns {Promise<boolean>} true si mis à jour
   */
  static async update(id, updates) {
    // Construire dynamiquement la requête UPDATE
    const fields = [];
    const values = [];

    const allowedFields = ['gravite', 'description', 'statut', 'idMedecin'];
    
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error('Aucun champ valide à mettre à jour');
    }

    values.push(id); // Pour la clause WHERE

    const query = `
      UPDATE INCIDENT 
      SET ${fields.join(', ')}
      WHERE id = ?
    `;

    try {
      const [result] = await pool.execute(query, values);
      
      if (result.affectedRows > 0) {
        logger.audit('UPDATE_INCIDENT', {
          incidentId: id,
          updates
        }, updates.idMedecin);
      }

      return result.affectedRows > 0;
    } catch (error) {
      logger.error(`Erreur lors de la mise à jour de l'incident ${id}:`, error);
      throw error;
    }
  }

  /**
   * Supprimer un incident (soft delete)
   * Note: Dans un vrai système IEC 62304, on ne supprime JAMAIS
   * On marquerait plutôt comme "archivé"
   * 
   * @param {number} id - ID de l'incident
   * @returns {Promise<boolean>} true si supprimé
   */
  static async delete(id) {
    // Soft delete : on pourrait ajouter un champ "deleted_at"
    // Pour l'exercice, on fait une vraie suppression
    const query = 'DELETE FROM INCIDENT WHERE id = ?';

    try {
      const [result] = await pool.execute(query, [id]);
      
      if (result.affectedRows > 0) {
        logger.audit('DELETE_INCIDENT', { incidentId: id });
      }

      return result.affectedRows > 0;
    } catch (error) {
      logger.error(`Erreur lors de la suppression de l'incident ${id}:`, error);
      throw error;
    }
  }

  /**
   * Vérifier si un patient existe
   * 
   * @param {number} patientId - ID du patient
   * @returns {Promise<boolean>} true si existe
   */
  static async patientExists(patientId) {
    const query = 'SELECT id FROM PATIENT WHERE id = ?';
    
    try {
      const [rows] = await pool.execute(query, [patientId]);
      return rows.length > 0;
    } catch (error) {
      logger.error(`Erreur lors de la vérification du patient ${patientId}:`, error);
      throw error;
    }
  }

  /**
   * Vérifier si un implant existe et appartient au patient
   * 
   * @param {number} implantId - ID de l'implant
   * @param {number} patientId - ID du patient
   * @returns {Promise<boolean>} true si existe et appartient
   */
  static async implantBelongsToPatient(implantId, patientId) {
    const query = `
      SELECT i.id 
      FROM IMPLANT i
      JOIN PATIENT p ON p.idImplant = i.id
      WHERE i.id = ? AND p.id = ?
    `;
    
    try {
      const [rows] = await pool.execute(query, [implantId, patientId]);
      return rows.length > 0;
    } catch (error) {
      logger.error('Erreur lors de la vérification de l\'implant:', error);
      throw error;
    }
  }
}

module.exports = Incident;
