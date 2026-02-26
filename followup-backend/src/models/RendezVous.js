const { pool } = require('../config/database');

class RendezVous {
    static async findAll() {
        const [rows] = await pool.execute(
            'SELECT * FROM RENDEZVOUS ORDER BY dateRendezVous DESC'
        );
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute(
            'SELECT * FROM RENDEZVOUS WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }

    static async create(data) {
        const { dateRendezVous, motif, idPatient, idMedecin } = data;
        const [result] = await pool.execute(
            `INSERT INTO RENDEZVOUS (dateRendezVous, motif, idPatient, idMedecin)
       VALUES (?, ?, ?, ?)`,
            [dateRendezVous, motif, idPatient, idMedecin]
        );
        return { id: result.insertId, ...data };
    }

    static async update(id, data) {
        const { dateRendezVous, motif, idPatient, idMedecin } = data;
        const [result] = await pool.execute(
            `UPDATE RENDEZVOUS
       SET dateRendezVous = ?, motif = ?, idPatient = ?, idMedecin = ?
       WHERE id = ?`,
            [dateRendezVous, motif, idPatient, idMedecin, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.execute(
            'DELETE FROM RENDEZVOUS WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = RendezVous;
