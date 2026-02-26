/**
 * Modèle Medecin - FollowUp
 */
const { pool } = require('../config/database');

class Medecin {
  static async findAll(filters = {}) {
    let query = `SELECT m.* FROM MEDECIN m WHERE 1=1`;
    const values = [];
    
    if (filters.specialite) {
      query += ' AND m.specialite = ?';
      values.push(filters.specialite);
    }
    
    query += ' ORDER BY m.nom, m.prenom';
    const [rows] = await pool.execute(query, values);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM MEDECIN WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const { nom, prenom, specialite, telephone, email } = data;
    const query = `INSERT INTO MEDECIN (nom, prenom, specialite, telephone, email) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [nom, prenom, specialite, telephone, email]);
    return { id: result.insertId, ...data };
  }

  static async update(id, updates) {
    const fields = [];
    const values = [];
    const allowed = ['nom', 'prenom', 'specialite', 'telephone', 'email'];
    
    for (const [key, value] of Object.entries(updates)) {
      if (allowed.includes(key)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (fields.length === 0) throw new Error('Aucun champ valide');
    values.push(id);
    
    const [result] = await pool.execute(`UPDATE MEDECIN SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM MEDECIN WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getPatients(medecinId) {
    const query = `
      SELECT DISTINCT p.*
      FROM PATIENT p
      INNER JOIN PHASEEVALUATION pe ON pe.idPatient = p.id
      WHERE pe.idMedecin = ?
    `;
    const [rows] = await pool.execute(query, [medecinId]);
    return rows;
  }

  static async getAgenda(medecinId, dateDebut, dateFin) {
    const query = `
      SELECT rdv.*, p.nom as patientNom, p.prenom as patientPrenom
      FROM RENDEZVOUS rdv
      INNER JOIN PATIENT p ON rdv.idPatient = p.id
      WHERE rdv.idMedecin = ? AND rdv.dateRendezVous BETWEEN ? AND ?
      ORDER BY rdv.dateRendezVous
    `;
    const [rows] = await pool.execute(query, [medecinId, dateDebut, dateFin]);
    return rows;
  }

  static async getStatistiques(medecinId) {
    const queries = {
      patients: `SELECT COUNT(DISTINCT idPatient) as total FROM PHASEEVALUATION WHERE idMedecin = ?`,
      incidents: `SELECT COUNT(*) as total FROM INCIDENT WHERE idMedecin = ?`,
      reglages: `SELECT COUNT(*) as total FROM SUIVIREGLAGE WHERE idMedecin = ?`
    };
    
    const stats = {};
    for (const [key, query] of Object.entries(queries)) {
      const [rows] = await pool.execute(query, [medecinId]);
      stats[key] = rows[0];
    }
    return stats;
  }
}

module.exports = Medecin;
