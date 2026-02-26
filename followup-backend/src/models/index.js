/**
 * Export de tous les modèles restants
 */
const { pool } = require('../config/database');

// Modèles génériques
const createModel = (tableName) => ({
  async findAll() {
    const [rows] = await pool.execute(`SELECT * FROM ${tableName}`);
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.execute(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
    return rows[0] || null;
  },
  async create(data) {
    const fields = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    const [result] = await pool.execute(
      `INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`,
      values
    );
    return { id: result.insertId, ...data };
  },
  async update(id, updates) {
    const fields = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    const [result] = await pool.execute(
      `UPDATE ${tableName} SET ${fields} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  },
  async delete(id) {
    const [result] = await pool.execute(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  }
});

module.exports = {
  PhaseEvaluation: createModel('PHASEEVALUATION'),
  EtapeEvaluation: createModel('ETAPEEVALUATION'),
  Hospitalisation: createModel('HOSPITALISATION'),
  PoseImplant: createModel('POSEIMPLANT'),
  SuiviPostImplantation: createModel('SUIVIPOSTIMPLANTATION'),
  EtapeSuivi: createModel('ETAPESUIVI'),
  RendezVous: createModel('RENDEZVOUS'),
  SuiviReglage: createModel('SUIVIREGLAGE')
};
