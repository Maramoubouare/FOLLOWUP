const { pool } = require('../config/database');
const logger = require('../utils/logger');

class EtapeEvaluation {
    // Créer une étape d'évaluation
    static async create(etapeData) {
        const {
            dateEtape,
            typeEtape,
            resultatEtape,
            idEvaluation,
            idMedecin
        } = etapeData;

        const query = `
      INSERT INTO ETAPEEVALUATION (
        dateEtape,
        typeEtape,
        resultatEtape,
        idEvaluation,
        idMedecin
      ) VALUES (?, ?, ?, ?, ?)
    `;

        const [result] = await pool.execute(query, [
            dateEtape,
            typeEtape,
            resultatEtape,
            idEvaluation,
            idMedecin
        ]);

        logger.audit(
            'CREATE_ETAPE_EVALUATION',
            { etapeId: result.insertId, idEvaluation, idMedecin },
            idMedecin
        );

        return {
            id: result.insertId,
            ...etapeData
        };
    }

    // Récupérer toutes les étapes d'une évaluation
    static async findAllByEvaluation(idEvaluation) {
        const query = `
      SELECT *
      FROM ETAPEEVALUATION
      WHERE idEvaluation = ?
      ORDER BY dateEtape DESC
    `;

        const [rows] = await pool.execute(query, [idEvaluation]);
        return rows;
    }


    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM ETAPEEVALUATION WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }


}

module.exports = EtapeEvaluation;
