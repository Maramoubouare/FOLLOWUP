// src/models/poseImplantModel.js
const { pool } = require('../config/database');
const logger = require('../utils/logger');

class PoseImplant {
    /**
     * Créer un enregistrement de pose d'implant
     * @param {object} poseData
     */
    static async create(poseData) {
        const {
            dateOperation,
            dureeOperation,
            detailsPose,
            idHospitalisation,
            idImplant,
            idMedecin
        } = poseData;

        const query = `
      INSERT INTO POSEIMPLANT (
        dateOperation,
        dureeOperation,
        detailsPose,
        idHospitalisation,
        idImplant,
        idMedecin
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

        const [result] = await pool.execute(query, [
            dateOperation,
            dureeOperation,
            detailsPose,
            idHospitalisation,
            idImplant,
            idMedecin
        ]);

        logger.audit(
            'CREATE_POSE_IMPLANT',
            {
                poseId: result.insertId,
                idHospitalisation,
                idImplant,
                idMedecin
            },
            idMedecin
        );

        return {
            id: result.insertId,
            ...poseData
        };
    }

    /**
     * Récupérer toutes les poses
     */
    static async findAll() {
        const query = `
      SELECT 
        p.*,
        m.nom AS medecinNom,
        m.prenom AS medecinPrenom
      FROM POSEIMPLANT p
      LEFT JOIN MEDECIN m ON p.idMedecin = m.id
      ORDER BY p.dateOperation DESC
    `;

        const [rows] = await pool.execute(query);
        return rows;
    }

    /**
     * Récupérer une pose par ID
     */
    static async findById(id) {
        const query = `
      SELECT 
        p.*,
        m.nom AS medecinNom,
        m.prenom AS medecinPrenom
      FROM POSEIMPLANT p
      LEFT JOIN MEDECIN m ON p.idMedecin = m.id
      WHERE p.id = ?
    `;

        const [rows] = await pool.execute(query, [id]);
        return rows[0] || null;
    }
    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM POSEIMPLANT WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = PoseImplant;
