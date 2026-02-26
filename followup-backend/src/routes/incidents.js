/**
 * Routes API - Gestion des incidents
 * FollowUp - CHU de Montpellier
 * 
 * @module routes/incidents
 */

const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Incident:
 *       type: object
 *       required:
 *         - dateIncident
 *         - heureIncident
 *         - gravite
 *         - description
 *         - idPatient
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de l'incident
 *         dateIncident:
 *           type: string
 *           format: date
 *           description: Date de l'incident (YYYY-MM-DD)
 *         heureIncident:
 *           type: string
 *           pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$'
 *           description: Heure de l'incident (HH:MM:SS)
 *         gravite:
 *           type: string
 *           enum: [Mineur, Modéré, Majeur, Critique]
 *           description: Niveau de gravité de l'incident
 *         description:
 *           type: string
 *           minLength: 10
 *           maxLength: 2000
 *           description: Description détaillée de l'incident
 *         idPatient:
 *           type: integer
 *           description: ID du patient concerné
 *         idImplant:
 *           type: integer
 *           nullable: true
 *           description: ID de l'implant (optionnel)
 *         idProcesseur:
 *           type: integer
 *           nullable: true
 *           description: ID du processeur (optionnel)
 *         idMedecin:
 *           type: integer
 *           nullable: true
 *           description: ID du médecin traitant (optionnel)
 *         statut:
 *           type: string
 *           enum: [Ouvert, EnCours, Résolu, Fermé]
 *           description: Statut de l'incident
 *       example:
 *         dateIncident: "2024-02-15"
 *         heureIncident: "14:30:00"
 *         gravite: "Modéré"
 *         description: "Son perçu plus faible qu'habituellement après calibration"
 *         idPatient: 1
 *         idImplant: 1
 *         idProcesseur: 1
 *         idMedecin: 2
 *     
 *     SuiviIncident:
 *       type: object
 *       required:
 *         - dateSuivi
 *         - actionsPrises
 *         - idMedecin
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré du suivi
 *         dateSuivi:
 *           type: string
 *           format: date
 *           description: Date du suivi
 *         actionsPrises:
 *           type: string
 *           minLength: 10
 *           maxLength: 2000
 *           description: Actions prises par l'équipe médicale
 *         idIncident:
 *           type: integer
 *           description: ID de l'incident
 *         idMedecin:
 *           type: integer
 *           description: ID du médecin ayant effectué le suivi
 *       example:
 *         dateSuivi: "2024-02-16"
 *         actionsPrises: "Ajustement du processeur, réétalonnage des seuils"
 *         idMedecin: 2
 */

/**
 * @swagger
 * /api/incidents:
 *   post:
 *     summary: Créer un nouvel incident
 *     tags: [Incidents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Incident'
 *     responses:
 *       201:
 *         description: Incident créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Incident'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Patient introuvable
 *       500:
 *         description: Erreur serveur
 */
router.post('/', incidentController.createIncident);

/**
 * @swagger
 * /api/incidents/{id}:
 *   get:
 *     summary: Récupérer un incident par ID
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'incident
 *     responses:
 *       200:
 *         description: Incident trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Incident'
 *       404:
 *         description: Incident introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', incidentController.getIncidentById);

/**
 * @swagger
 * /api/incidents/{id}:
 *   put:
 *     summary: Mettre à jour un incident
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'incident
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gravite:
 *                 type: string
 *                 enum: [Mineur, Modéré, Majeur, Critique]
 *               description:
 *                 type: string
 *               statut:
 *                 type: string
 *                 enum: [Ouvert, EnCours, Résolu, Fermé]
 *               idMedecin:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Incident mis à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Incident introuvable
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', incidentController.updateIncident);

/**
 * @swagger
 * /api/incidents/{id}:
 *   delete:
 *     summary: Supprimer un incident
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'incident
 *     responses:
 *       200:
 *         description: Incident supprimé
 *       404:
 *         description: Incident introuvable
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', incidentController.deleteIncident);

/**
 * @swagger
 * /api/incidents/{id}/suivis:
 *   post:
 *     summary: Ajouter un suivi à un incident
 *     tags: [Suivis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'incident
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SuiviIncident'
 *     responses:
 *       201:
 *         description: Suivi ajouté avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Incident introuvable
 *       500:
 *         description: Erreur serveur
 */
router.post('/:id/suivis', incidentController.addSuivi);

/**
 * @swagger
 * /api/incidents/{id}/suivis:
 *   get:
 *     summary: Récupérer l'historique des suivis d'un incident
 *     tags: [Suivis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'incident
 *     responses:
 *       200:
 *         description: Liste des suivis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SuiviIncident'
 *       404:
 *         description: Incident introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id/suivis', incidentController.getSuivis);

module.exports = router;
