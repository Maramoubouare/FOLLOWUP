/**
 * Contrôleur Incidents - Logique métier
 * FollowUp - CHU de Montpellier
 * 
 * Conformité IEC 62304 : Classe B
 * @module controllers/incidentController
 */

const Incident = require('../models/Incident');
const SuiviIncident = require('../models/SuiviIncident');
const EtapeSuivi = require('../models/etapeSuiviModel');

const logger = require('../utils/logger');
const {
  createIncidentSchema,
  updateIncidentSchema,
  createSuiviSchema
} = require('../validators/incidentValidator');

/**
 * Créer un nouvel incident
 * POST /api/incidents
 */
exports.createIncident = async (req, res) => {
  try {
    // Validation des données
    const { error, value } = createIncidentSchema.validate(req.body);

    if (error) {
      logger.warn('Validation échouée lors de la création d\'incident', {
        errors: error.details.map(d => d.message)
      });
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message
        }))
      });
    }

    // Vérifier que le patient existe
    const patientExists = await Incident.patientExists(value.idPatient);
    if (!patientExists) {
      return res.status(404).json({
        success: false,
        message: `Patient avec l'ID ${value.idPatient} introuvable`
      });
    }

    // Si un implant est fourni, vérifier qu'il appartient au patient
    if (value.idImplant) {
      const implantBelongs = await Incident.implantBelongsToPatient(
        value.idImplant,
        value.idPatient
      );

      if (!implantBelongs) {
        return res.status(400).json({
          success: false,
          message: 'L\'implant spécifié n\'appartient pas à ce patient'
        });
      }
    }

    // Créer l'incident
    const incident = await Incident.create(value);

    logger.info(`Incident créé avec succès: ID ${incident.id}`, {
      incidentId: incident.id,
      patientId: value.idPatient,
      gravite: value.gravite
    });

    res.status(201).json({
      success: true,
      message: 'Incident créé avec succès',
      data: incident
    });

  } catch (error) {
    logger.error('Erreur lors de la création de l\'incident:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de l\'incident',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Récupérer un incident par ID
 * GET /api/incidents/:id
 */
exports.getIncidentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Valider que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID incident invalide'
      });
    }

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: `Incident avec l'ID ${id} introuvable`
      });
    }

    res.status(200).json({
      success: true,
      data: incident
    });

  } catch (error) {
    logger.error(`Erreur lors de la récupération de l'incident ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération de l\'incident'
    });
  }
};

/**
 * Récupérer tous les incidents d'un patient
 * GET /api/patients/:id/incidents
 */
exports.getPatientIncidents = async (req, res) => {
  try {
    const { id } = req.params;

    // Valider que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID patient invalide'
      });
    }

    // Vérifier que le patient existe
    const patientExists = await Incident.patientExists(id);
    if (!patientExists) {
      return res.status(404).json({
        success: false,
        message: `Patient avec l'ID ${id} introuvable`
      });
    }

    const incidents = await Incident.findByPatientId(id);

    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });

  } catch (error) {
    logger.error(`Erreur lors de la récupération des incidents du patient ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des incidents'
    });
  }
};

/**
 * Mettre à jour un incident
 * PUT /api/incidents/:id
 */
exports.updateIncident = async (req, res) => {
  try {
    const { id } = req.params;

    // Valider que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID incident invalide'
      });
    }

    // Validation des données
    const { error, value } = updateIncidentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message
        }))
      });
    }

    // Vérifier que l'incident existe
    const incident = await Incident.findById(id);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: `Incident avec l'ID ${id} introuvable`
      });
    }

    // Mettre à jour
    const updated = await Incident.update(id, value);

    if (updated) {
      const updatedIncident = await Incident.findById(id);

      logger.info(`Incident ${id} mis à jour avec succès`);

      res.status(200).json({
        success: true,
        message: 'Incident mis à jour avec succès',
        data: updatedIncident
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour de l\'incident'
      });
    }

  } catch (error) {
    logger.error(`Erreur lors de la mise à jour de l'incident ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour de l\'incident'
    });
  }
};

/**
 * Supprimer un incident (soft delete)
 * DELETE /api/incidents/:id
 */
exports.deleteIncident = async (req, res) => {
  try {
    const { id } = req.params;

    // Valider que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID incident invalide'
      });
    }

    // Vérifier que l'incident existe
    const incident = await Incident.findById(id);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: `Incident avec l'ID ${id} introuvable`
      });
    }

    // Supprimer
    const deleted = await Incident.delete(id);

    if (deleted) {
      logger.info(`Incident ${id} supprimé avec succès`);

      res.status(200).json({
        success: true,
        message: 'Incident supprimé avec succès'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de l\'incident'
      });
    }

  } catch (error) {
    logger.error(`Erreur lors de la suppression de l'incident ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression de l\'incident'
    });
  }
};

/**
 * Ajouter un suivi à un incident
 * POST /api/incidents/:id/suivis
 */
exports.addSuivi = async (req, res) => {
  try {
    const { id } = req.params;

    // Valider que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID incident invalide'
      });
    }

    // Validation des données
    const { error, value } = createSuiviSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message
        }))
      });
    }

    // Vérifier que l'incident existe
    const incidentExists = await SuiviIncident.incidentExists(id);
    if (!incidentExists) {
      return res.status(404).json({
        success: false,
        message: `Incident avec l'ID ${id} introuvable`
      });
    }

    // Créer le suivi
    const suivi = await SuiviIncident.create(id, value);

    logger.info(`Suivi ajouté à l'incident ${id}`, { suiviId: suivi.id });

    res.status(201).json({
      success: true,
      message: 'Suivi ajouté avec succès',
      data: suivi
    });

  } catch (error) {
    logger.error(`Erreur lors de l'ajout du suivi à l'incident ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'ajout du suivi'
    });
  }
};

/**
 * Récupérer l'historique des suivis d'un incident
 * GET /api/incidents/:id/suivis
 */
exports.getSuivis = async (req, res) => {
  try {
    const { id } = req.params;

    // Valider que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID incident invalide'
      });
    }

    // Vérifier que l'incident existe
    const incidentExists = await SuiviIncident.incidentExists(id);
    if (!incidentExists) {
      return res.status(404).json({
        success: false,
        message: `Incident avec l'ID ${id} introuvable`
      });
    }

    const suivis = await SuiviIncident.findByIncidentId(id);

    res.status(200).json({
      success: true,
      count: suivis.length,
      data: suivis
    });

  } catch (error) {
    logger.error(`Erreur lors de la récupération des suivis de l'incident ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des suivis'
    });
  }
};

/**
 * 
 * Récupérer toutes les étapes d'un suivi post-implantation
 * GET /api/suivis/:id/etapes
 */
exports.getBySuiviPost = async (req, res) => {
  try {
    const idSuiviPost = req.params.id;

    if (isNaN(idSuiviPost) || idSuiviPost <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID de suivi post-implantation invalide'
      });
    }

    const etapes = await EtapeSuivi.findAll({ where: { idSuiviPost } });

    res.status(200).json({
      success: true,
      count: etapes.length,
      data: etapes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des étapes de suivi'
    });
  }
};
exports.deleteEtapeForSuiviPost = async (req, res) => {
  try {
    const { id, idEtape } = req.params;

    if (isNaN(id) || id <= 0 || isNaN(idEtape) || idEtape <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID de suivi ou d’étape invalide'
      });
    }

    const deleted = await EtapeSuivi.deleteById(idEtape, id); // ou ton Model générique

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Étape ${idEtape} introuvable pour le suivi ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Étape de suivi supprimée avec succès'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l’étape de suivi'
    });
  }
};


/**
 * Créer une étape pour un suivi post-implantation
 * POST /api/suivis/:id/etapes
 */
exports.createForSuiviPost = async (req, res) => {
  try {
    const idSuiviPost = req.params.id;

    if (isNaN(idSuiviPost) || idSuiviPost <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID de suivi post-implantation invalide'
      });
    }

    const { dateEtape, typeEtape, resultatEtape, idMedecin } = req.body;

    // (optionnel) petites validations basiques
    if (!dateEtape || !typeEtape) {
      return res.status(400).json({
        success: false,
        message: 'dateEtape et typeEtape sont obligatoires'
      });
    }

    const etape = await EtapeSuivi.create({
      dateEtape,
      typeEtape,
      resultatEtape,
      idSuiviPost,
      idMedecin
    });

    res.status(201).json({
      success: true,
      message: 'Étape de suivi créée avec succès',
      data: etape
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'étape de suivi'
    });
  }
};
/**
 * Récupérer toutes les étapes d'un suivi post-implantation
 * GET /api/suivis/:id/etapes
 */
/**
 * Récupérer toutes les étapes d'un suivi post-implantation
 * GET /api/suivis/:id/etapes
 */
exports.getBySuiviPost = async (req, res) => {
  try {
    const idSuiviPost = req.params.id;

    if (isNaN(idSuiviPost) || idSuiviPost <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID de suivi post-implantation invalide'
      });
    }

    const etapes = await EtapeSuivi.findAllBySuiviPost(idSuiviPost); // ✅ même nom que dans le modèle

    res.status(200).json({
      success: true,
      count: etapes.length,
      data: etapes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des étapes de suivi'
    });
  }

};

