/**
 * Schémas de validation des données avec Joi
 * FollowUp - CHU de Montpellier
 * 
 * Conformité IEC 62304 : Validation stricte des entrées (Classe B)
 * @module validators/incidentValidator
 */

const Joi = require('joi');

/**
 * Niveaux de gravité autorisés selon TP06
 */
const GRAVITES = ['Mineur', 'Modéré', 'Majeur', 'Critique'];

/**
 * Statuts autorisés selon TP06
 */
const STATUTS = ['Ouvert', 'EnCours', 'Résolu', 'Fermé'];

/**
 * Schéma de validation pour la création d'un incident
 */
const createIncidentSchema = Joi.object({
  dateIncident: Joi.date()
    .max('now')
    .required()
    .messages({
      'date.base': 'La date de l\'incident doit être une date valide',
      'date.max': 'La date de l\'incident ne peut pas être dans le futur',
      'any.required': 'La date de l\'incident est obligatoire'
    }),
  
  heureIncident: Joi.string()
    .pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .required()
    .messages({
      'string.pattern.base': 'L\'heure doit être au format HH:MM:SS',
      'any.required': 'L\'heure de l\'incident est obligatoire'
    }),
  
  gravite: Joi.string()
    .valid(...GRAVITES)
    .required()
    .messages({
      'any.only': `La gravité doit être l'une des valeurs suivantes : ${GRAVITES.join(', ')}`,
      'any.required': 'La gravité est obligatoire'
    }),
  
  description: Joi.string()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.min': 'La description doit contenir au moins 10 caractères',
      'string.max': 'La description ne peut pas dépasser 2000 caractères',
      'any.required': 'La description est obligatoire'
    }),
  
  idPatient: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'L\'ID patient doit être un nombre',
      'number.positive': 'L\'ID patient doit être positif',
      'any.required': 'L\'ID patient est obligatoire'
    }),
  
  idImplant: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(null)
    .messages({
      'number.base': 'L\'ID implant doit être un nombre',
      'number.positive': 'L\'ID implant doit être positif'
    }),
  
  idProcesseur: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(null)
    .messages({
      'number.base': 'L\'ID processeur doit être un nombre',
      'number.positive': 'L\'ID processeur doit être positif'
    }),
  
  idMedecin: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(null)
    .messages({
      'number.base': 'L\'ID médecin doit être un nombre',
      'number.positive': 'L\'ID médecin doit être positif'
    })
});

/**
 * Schéma de validation pour la mise à jour d'un incident
 */
const updateIncidentSchema = Joi.object({
  gravite: Joi.string()
    .valid(...GRAVITES)
    .optional(),
  
  description: Joi.string()
    .min(10)
    .max(2000)
    .optional(),
  
  statut: Joi.string()
    .valid(...STATUTS)
    .optional(),
  
  idMedecin: Joi.number()
    .integer()
    .positive()
    .optional()
    .allow(null)
}).min(1); // Au moins un champ doit être présent

/**
 * Schéma de validation pour l'ajout d'un suivi
 */
const createSuiviSchema = Joi.object({
  dateSuivi: Joi.date()
    .max('now')
    .required()
    .messages({
      'date.base': 'La date du suivi doit être une date valide',
      'date.max': 'La date du suivi ne peut pas être dans le futur',
      'any.required': 'La date du suivi est obligatoire'
    }),
  
  actionsPrises: Joi.string()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.min': 'Les actions prises doivent contenir au moins 10 caractères',
      'string.max': 'Les actions prises ne peuvent pas dépasser 2000 caractères',
      'any.required': 'Les actions prises sont obligatoires'
    }),
  
  idMedecin: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'L\'ID médecin doit être un nombre',
      'number.positive': 'L\'ID médecin doit être positif',
      'any.required': 'L\'ID médecin est obligatoire'
    })
});

module.exports = {
  createIncidentSchema,
  updateIncidentSchema,
  createSuiviSchema,
  GRAVITES,
  STATUTS
};
