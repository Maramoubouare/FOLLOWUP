/**
 * Modèle Patient
 * FollowUp - CHU de Montpellier
 */

const { pool } = require('../config/database');

class Patient {
  static async findAll() {
    const query = `
      SELECT 
        p.*,
        i.typeImplant,
        i.datePose as dateImplantation
      FROM PATIENT p
      LEFT JOIN IMPLANT i ON p.idImplant = i.id
      ORDER BY p.nom, p.prenom
    `;
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async findById(id) {
    const query = `
      SELECT 
        p.*,
        i.typeImplant,
        i.nombreElectrodes,
        i.datePose,
        pr.typeProcesseur,
        pr.batterie
      FROM PATIENT p
      LEFT JOIN IMPLANT i ON p.idImplant = i.id
      LEFT JOIN PROCESSEUR pr ON i.idProcesseur = pr.id
      WHERE p.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  static async create(patientData) {
    const {
      nom, prenom, dateNaissance, sexe,
      adresse, telephone, email,
      dateImplantation = null,
      idImplant = null
    } = patientData;

    const query = `
      INSERT INTO PATIENT (
        nom, prenom, dateNaissance, sexe, 
        adresse, telephone, email, 
        dateImplantation, idImplant
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      nom, prenom, dateNaissance, sexe,
      adresse, telephone, email,
      dateImplantation, idImplant
    ]);

    return { id: result.insertId, ...patientData };
  }

  static async update(id, updates) {
    const fields = [];
    const values = [];
    const allowedFields = ['nom', 'prenom', 'dateNaissance', 'sexe', 'adresse', 'telephone', 'email', 'dateImplantation', 'idImplant'];
    
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) throw new Error('Aucun champ valide');
    values.push(id);
    
    const [result] = await pool.execute(`UPDATE PATIENT SET ${fields.join(', ')} WHERE id = ?`, values);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM PATIENT WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async search(searchTerm) {
    const query = `
      SELECT p.*, i.typeImplant
      FROM PATIENT p
      LEFT JOIN IMPLANT i ON p.idImplant = i.id
      WHERE p.nom LIKE ? OR p.prenom LIKE ? OR p.email LIKE ?
      ORDER BY p.nom, p.prenom
    `;
    const term = `%${searchTerm}%`;
    const [rows] = await pool.execute(query, [term, term, term]);
    return rows;
  }
}

module.exports = Patient;
