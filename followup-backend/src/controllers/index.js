/**
 * Contrôleurs - FollowUp Backend
 */


const Patient = require('../models/Patient');
const Medecin = require('../models/Medecin');
const Implant = require('../models/Implant');
const Processeur = require('../models/Processeur');
const EtapeEvaluation = require('../models/etapeEvaluationModel');
const PoseImplant = require('../models/poseImplantModel');
const RendezVous = require('../models/RendezVous');
const models = require('../models');

// Contrôleur générique
const createController = (Model, name) => ({
  async getAll(req, res) {
    try {
      const items = await Model.findAll(req.query);
      res.json({ success: true, count: items.length, data: items });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
  },
  async getById(req, res) {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: `${name} introuvable` });
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
  },
  async create(req, res) {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async update(req, res) {
    try {
      const updated = await Model.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ success: false, message: `${name} introuvable` });
      const item = await Model.findById(req.params.id);
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async delete(req, res) {
    try {
      const deleted = await Model.delete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: `${name} introuvable` });
      res.json({ success: true, message: `${name} supprimé` });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
  }
});

module.exports = {
  patientController: createController(Patient, 'Patient'),
  medecinController: createController(Medecin, 'Médecin'),
  implantController: createController(Implant, 'Implant'),
  etapeEvaluationController: createController(EtapeEvaluation, 'Étape évaluation'),
  poseImplantController: createController(PoseImplant, 'Pose implant'),
  processeurController: createController(Processeur, 'Processeur'),
  rendezVousController: createController(RendezVous, 'Rendez-vous'),
  phaseEvaluationController: createController(models.PhaseEvaluation, 'Phase évaluation'),
  hospitalisationController: createController(models.Hospitalisation, 'Hospitalisation'),
  suiviPostImplantationController: createController(models.SuiviPostImplantation, 'Suivi'),
  etapeSuiviController: createController(models.EtapeSuivi, 'Étape suivi'),
  suiviReglageController: createController(models.SuiviReglage, 'Réglage')
};
