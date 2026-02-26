const { pool } = require('../config/database');

class Implant {
  static async findAll() {
    const query = `SELECT i.*, p.nom as patientNom, p.prenom as patientPrenom FROM IMPLANT i LEFT JOIN PATIENT p ON p.idImplant = i.id ORDER BY i.datePose DESC`;
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async findById(id) {
    const query = `SELECT i.*, p.nom as patientNom FROM IMPLANT i LEFT JOIN PATIENT p ON p.idImplant = i.id WHERE i.id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const { typeImplant, datePose, nombreElectrodes, idProcesseur } = data;
    const query = `INSERT INTO IMPLANT (typeImplant, datePose, nombreElectrodes, idProcesseur) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [typeImplant, datePose, nombreElectrodes, idProcesseur]);
    return { id: result.insertId, ...data };
  }

  static async update(id, updates) {
    const fields = Object.keys(updates).map(k => `${k} = ?`);
    const values = [...Object.values(updates), id];
    const [result] = await pool.execute(`UPDATE IMPLANT SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM IMPLANT WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getReglages(id) {
    const [rows] = await pool.execute('SELECT * FROM SUIVIREGLAGE WHERE idImplant = ? ORDER BY dateReglage DESC', [id]);
    return rows;
  }

  static async getIncidents(id) {
    const [rows] = await pool.execute('SELECT * FROM INCIDENT WHERE idImplant = ? ORDER BY dateIncident DESC', [id]);
    return rows;
  }

  static async getStatistiques(id) {
    const queries = {
      anciennete: `SELECT DATEDIFF(CURDATE(), datePose) as jours FROM IMPLANT WHERE id = ?`,
      nbReglages: `SELECT COUNT(*) as total FROM SUIVIREGLAGE WHERE idImplant = ?`,
      nbIncidents: `SELECT COUNT(*) as total FROM INCIDENT WHERE idImplant = ?`
    };
    const stats = {};
    for (const [key, query] of Object.entries(queries)) {
      const [rows] = await pool.execute(query, [id]);
      stats[key] = rows[0];
    }
    return stats;
  }
}

module.exports = Implant;
