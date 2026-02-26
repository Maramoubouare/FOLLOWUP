/**
 * Routes API - FollowUp Backend Complet
 */
const express = require('express');
const router = express.Router();
const {
  patientController,
  medecinController,
  implantController,
  processeurController,
  phaseEvaluationController,
  hospitalisationController,
  etapeEvaluationController,
  suiviPostImplantationController,
  rendezVousController,
  suiviReglageController,
  poseImplantController
} = require('../controllers');
const incidentController = require('../controllers/incidentController');

// PATIENTS
router.get('/patients', patientController.getAll);
router.get('/patients/:id', patientController.getById);
router.post('/patients', patientController.create);
router.put('/patients/:id', patientController.update);
router.delete('/patients/:id', patientController.delete);

// MEDECINS
router.get('/medecins', medecinController.getAll);
router.get('/medecins/:id', medecinController.getById);
router.post('/medecins', medecinController.create);
router.put('/medecins/:id', medecinController.update);
router.delete('/medecins/:id', medecinController.delete);

// IMPLANTS
router.get('/implants', implantController.getAll);
router.get('/implants/:id', implantController.getById);
router.post('/implants', implantController.create);
router.put('/implants/:id', implantController.update);
router.delete('/implants/:id', implantController.delete);

// POSE IMPLANT
router.get('/poses-implant', poseImplantController.getAll);
router.get('/poses-implant/:id', poseImplantController.getById);
router.post('/poses-implant', poseImplantController.create);
router.put('/poses-implant/:id', poseImplantController.update);
router.delete('/poses-implant/:id', poseImplantController.delete);

// PROCESSEURS
router.get('/processeurs', processeurController.getAll);
router.get('/processeurs/:id', processeurController.getById);
router.post('/processeurs', processeurController.create);
router.put('/processeurs/:id', processeurController.update);
router.delete('/processeurs/:id', processeurController.delete);

// INCIDENTS 
router.post('/incidents', incidentController.createIncident);
router.get('/incidents/:id', incidentController.getIncidentById);
router.put('/incidents/:id', incidentController.updateIncident);
router.delete('/incidents/:id', incidentController.deleteIncident);
router.post('/incidents/:id/suivis', incidentController.addSuivi);
router.get('/incidents/:id/suivis', incidentController.getSuivis);
router.get('/patients/:id/incidents', incidentController.getPatientIncidents);
router.get('/suivis/:id/etapes', incidentController.getBySuiviPost);
router.post('/suivis/:id/etapes', incidentController.createForSuiviPost);
router.delete(
  '/suivis/:id/etapes/:idEtape',
  incidentController.deleteEtapeForSuiviPost
);

// EVALUATIONS
router.get('/evaluations', phaseEvaluationController.getAll);
router.post('/evaluations', phaseEvaluationController.create);
router.post('/evaluationsetapes', etapeEvaluationController.create);
router.get('/evaluationsetapes', etapeEvaluationController.getAll);
router.delete('/evaluations/:id', etapeEvaluationController.delete);
router.delete('/evaluationsetapes/:id', etapeEvaluationController.delete);


// HOSPITALISATIONS
router.get('/hospitalisations', hospitalisationController.getAll);
router.post('/hospitalisations', hospitalisationController.create);

// SUIVIS POST-IMPLANTATION
router.get('/suivis', suiviPostImplantationController.getAll);
router.post('/suivis', suiviPostImplantationController.create);
router.put('/suivis/:id', suiviPostImplantationController.update);
router.delete('/suivis/:id', suiviPostImplantationController.delete);

// RENDEZ-VOUS
router.get('/rendez-vous', rendezVousController.getAll);
router.post('/rendez-vous', rendezVousController.create);
router.put('/rendez-vous/:id', rendezVousController.update);
router.delete('/rendez-vous/:id', rendezVousController.delete);

// REGLAGES
router.get('/reglages', suiviReglageController.getAll);
router.post('/reglages', suiviReglageController.create);
router.put('/reglages/:id', suiviReglageController.update);
router.delete('/reglages/:id', suiviReglageController.delete);

module.exports = router;
