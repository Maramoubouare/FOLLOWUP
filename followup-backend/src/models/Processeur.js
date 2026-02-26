const { pool } = require('../config/database');

class Processeur {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM PROCESSEUR ORDER BY dateInstallation DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM PROCESSEUR WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const { typeProcesseur, dateInstallation, batterie } = data;
    const query = `INSERT INTO PROCESSEUR (typeProcesseur, dateInstallation, batterie) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(query, [typeProcesseur, dateInstallation, batterie]);
    return { id: result.insertId, ...data };
  }

  static async update(id, updates) {
    const fields = Object.keys(updates).map(k => `${k} = ?`);
    const values = [...Object.values(updates), id];
    const [result] = await pool.execute(`UPDATE PROCESSEUR SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM PROCESSEUR WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getReglages(id) {
    const [rows] = await pool.execute('SELECT * FROM SUIVIREGLAGE WHERE idProcesseur = ? ORDER BY dateReglage DESC', [id]);
    return rows;
  }

  static async getIncidents(id) {
    const [rows] = await pool.execute('SELECT * FROM INCIDENT WHERE idProcesseur = ? ORDER BY dateIncident DESC', [id]);
    return rows;
  }
}

module.exports = Processeur;
