const { pool } = require('../config/database');
const logger = require('../utils/logger');

class EtapeSuivi {
  static async create(etapeData) {
    const {
      dateEtape,
      typeEtape,
      resultatEtape,
      idSuiviPost,
      idMedecin
    } = etapeData;

    const query = `
      INSERT INTO ETAPESUIVI (
        dateEtape,
        typeEtape,
        resultatEtape,
        idSuiviPost,
        idMedecin
      ) VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      dateEtape,
      typeEtape,
      resultatEtape,
      idSuiviPost,
      idMedecin
    ]);

    logger.audit(
      'CREATE_ETAPE_SUIVI',
      { etapeId: result.insertId, idSuiviPost, idMedecin },
      idMedecin
    );

    return {
      id: result.insertId,
      ...etapeData
    };
  }


  static async findAllBySuiviPost(idSuiviPost) {
    const query = `
      SELECT *
      FROM ETAPESUIVI
      WHERE idSuiviPost = ?
      ORDER BY dateEtape DESC
    `;

    const [rows] = await pool.execute(query, [idSuiviPost]);
    return rows;
  }

  static async deleteById(idEtape, idSuiviPost) {
    const [result] = await pool.execute(
      'DELETE FROM ETAPESUIVI WHERE id = ? AND idSuiviPost = ?',
      [idEtape, idSuiviPost]
    );
    return result.affectedRows > 0;
  }
}

module.exports = EtapeSuivi;
