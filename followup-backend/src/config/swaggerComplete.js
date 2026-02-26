/**
 * Configuration Swagger complète - FollowUp API
 * CHU de Montpellier
 */

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'FollowUp API Complète',
    version: '1.0.0',
    description: `
      API REST complète pour la gestion des implants cochléaires
      
      **CHU de Montpellier - Service ORL**
      
      ### Modules disponibles
      - Patients
      - Médecins
      - Implants
      - Processeurs
      - Incidents
      - Évaluations
      - Hospitalisations
      - Rendez-vous
      - Réglages
      - Suivis-etape
      - Suivis-incident
      - Suivis-etape
    `,
    contact: {
      name: 'Support FollowUp',
      email: 'support.followup@chu-montpellier.fr'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Serveur de développement'
    }
  ],
  tags: [
    { name: 'Patients', description: 'Gestion des patients' },
    { name: 'Médecins', description: 'Gestion des médecins' },
    { name: 'Implants', description: 'Gestion des implants' },
    { name: 'Processeurs', description: 'Gestion des processeurs' },
    { name: 'Incidents', description: 'Gestion des incidents' },
    { name: 'Incidents-Suivis', description: 'Gestion des incidents' },
    { name: 'Évaluations', description: 'Phases d\'évaluation pré-implantation' },
    { name: 'Hospitalisations', description: 'Gestion des hospitalisations' },
    { name: 'Suivis', description: 'Suivis post-implantation' },
    { name: 'Rendez-vous', description: 'Gestion des rendez-vous' },
    { name: 'Réglages', description: 'Réglages des processeurs' },
    { name: 'Suivis-incident', description: 'Suivis incident' },
    { name: 'Évaluations-etape', description: 'Évaluations-etape' },
    { name: 'Implants-poses', description: 'Implants-poses' },
    { name: 'suivis-etape', description: 'Suivis-etape' }

  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Vérifier l\'état du serveur',
        responses: {
          200: {
            description: 'Serveur opérationnel',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'FollowUp API Complète opérationnelle',
                  version: '1.0.0'
                }
              }
            }
          }
        }
      }
    },

    // PATIENTS
    '/api/patients': {
      get: {
        tags: ['Patients'],
        summary: 'Liste de tous les patients',
        responses: {
          200: { description: 'Liste des patients' }
        }
      },
      post: {
        tags: ['Patients'],
        summary: 'Créer un nouveau patient',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['nom', 'prenom', 'dateNaissance', 'sexe'],
                properties: {
                  nom: { type: 'string' },
                  prenom: { type: 'string' },
                  dateNaissance: { type: 'string', format: 'date' },
                  sexe: { type: 'string', enum: ['Masculin', 'Féminin', 'Autre'] },
                  adresse: { type: 'string' },
                  telephone: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  dateImplantation: { type: 'string', format: 'date' },
                  idImplant: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Patient créé avec succès' }
        }
      }
    },
    '/api/patients/{id}': {
      get: {
        tags: ['Patients'],
        summary: 'Détails d\'un patient',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Détails du patient' },
          404: { description: 'Patient introuvable' }
        }
      },
      put: {
        tags: ['Patients'],
        summary: 'Modifier un patient',
        parameters: [
          {
            name: 'id', in: 'path', required: true, schema: { type: 'integer' }
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nom: { type: 'string' },
                  prenom: { type: 'string' },
                  telephone: { type: 'string' },
                  email: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Patient modifié' },
          404: { description: 'Patient introuvable' }
        }
      },
      delete: {
        tags: ['Patients'],
        summary: 'Supprimer un patient',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Patient supprimé' },
          404: { description: 'Patient introuvable' }
        }
      }
    },

    // MEDECINS
    '/api/medecins': {
      get: {
        tags: ['Médecins'],
        summary: 'Liste de tous les médecins',
        responses: {
          200: { description: 'Liste des médecins' }
        }
      },
      post: {
        tags: ['Médecins'],
        summary: 'Créer un nouveau médecin',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['nom', 'prenom', 'specialite', 'email'],
                properties: {
                  nom: { type: 'string' },
                  prenom: { type: 'string' },
                  specialite: { type: 'string' },
                  telephone: { type: 'string' },
                  email: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Médecin créé' }
        }
      }
    },
    '/api/medecins/{id}': {
      get: {
        tags: ['Médecins'],
        summary: 'Détails d\'un médecin',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Détails du médecin' },
          404: { description: 'Médecin introuvable' }
        }
      },
      put: {
        tags: ['Médecins'],
        summary: 'Modifier un médecin',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  specialite: { type: 'string' },
                  telephone: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Médecin modifié' }
        }
      },
      delete: {
        tags: ['Médecins'],
        summary: 'Supprimer un médecin',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Médecin supprimé' }
        }
      }
    },

    // IMPLANTS
    '/api/implants': {
      get: {
        tags: ['Implants'],
        summary: 'Liste de tous les implants',
        responses: {
          200: { description: 'Liste des implants' }
        }
      },
      post: {
        tags: ['Implants'],
        summary: 'Créer un nouvel implant',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['typeImplant', 'datePose', 'nombreElectrodes', 'idProcesseur'],
                properties: {
                  typeImplant: { type: 'string' },
                  datePose: { type: 'string', format: 'date' },
                  nombreElectrodes: { type: 'integer' },
                  idProcesseur: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Implant créé' }
        }
      }
    },
    '/api/implants/{id}': {
      get: {
        tags: ['Implants'],
        summary: 'Détails d\'un implant',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Détails de l\'implant' }
        }
      }
    },

    // PROCESSEURS
    '/api/processeurs': {
      get: {
        tags: ['Processeurs'],
        summary: 'Liste de tous les processeurs',
        responses: {
          200: { description: 'Liste des processeurs' }
        }
      },
      post: {
        tags: ['Processeurs'],
        summary: 'Créer un nouveau processeur',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['typeProcesseur', 'dateInstallation', 'batterie'],
                properties: {
                  typeProcesseur: { type: 'string' },
                  dateInstallation: { type: 'string', format: 'date' },
                  batterie: { type: 'string', enum: ['Rechargeable', 'Piles'] }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Processeur créé' }
        }
      }
    },

    // INCIDENTS
    '/api/incidents': {
      post: {
        tags: ['Incidents'],
        summary: 'Créer un incident',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['dateIncident', 'heureIncident', 'gravite', 'description', 'idPatient'],
                properties: {
                  dateIncident: { type: 'string', format: 'date' },
                  heureIncident: { type: 'string' },
                  gravite: { type: 'string', enum: ['Mineur', 'Modéré', 'Majeur', 'Critique'] },
                  description: { type: 'string' },
                  idPatient: { type: 'integer' },
                  idImplant: { type: 'integer' },
                  idProcesseur: { type: 'integer' },
                  idMedecin: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Incident créé' }
        }
      }
    },
    '/api/incidents/{id}': {
      get: {
        tags: ['Incidents'],
        summary: 'Détails d\'un incident',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Détails de l\'incident' }
        }
      },
      put: {
        tags: ['Incidents'],
        summary: 'Modifier un incident',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Incident modifié' }
        }
      },
      delete: {
        tags: ['Incidents'],
        summary: 'Supprimer un incident',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Incident supprimé' }
        }
      }
    },
    // RENDEZ-VOUS
    '/api/rendez-vous': {
      get: {
        tags: ['Rendez-vous'],
        summary: 'Liste des rendez-vous',
        responses: {
          200: { description: 'Liste des rendez-vous' }
        }
      },
      post: {
        tags: ['Rendez-vous'],
        summary: 'Créer un rendez-vous',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['dateRendezVous', 'motif', 'idPatient', 'idMedecin'],
                properties: {
                  dateRendezVous: { type: 'string', format: 'date-time' },
                  motif: { type: 'string' },
                  idPatient: { type: 'integer' },
                  idMedecin: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Rendez-vous créé' }
        }
      }
    }
    ,
    '/api/rendez-vous/{id}': {
      put: {
        tags: ['Rendez-vous'],
        summary: 'Modifier un rendez-vous',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        requestBody: {                          // ✅ à ajouter
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['dateRendezVous', 'motif', 'idPatient', 'idMedecin'],
                properties: {
                  dateRendezVous: { type: 'string', format: 'date-time' },
                  motif: { type: 'string' },
                  idPatient: { type: 'integer' },
                  idMedecin: { type: 'integer' }
                }
              },
              example: {
                dateRendezVous: '2026-03-02T11:00:00',
                motif: 'Suivi',
                idPatient: 1,
                idMedecin: 2
              }
            }
          }
        },
        responses: {
          200: { description: 'Rendez-vous modifié' }
        }
      },
      delete: {
        tags: ['Rendez-vous'],
        summary: 'Supprimer un rendez-vous',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Rendez-vous supprimé' }
        }
      }
    },


    // ÉVALUATIONS
    '/api/evaluations': {
      get: {
        tags: ['Évaluations'],
        summary: 'Liste des évaluations',
        responses: {
          200: { description: 'Liste des phases d\'évaluation' }
        }
      },
      post: {
        tags: ['Évaluations'],
        summary: 'Créer une évaluation',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  dateDebutEvaluation: { type: 'string', format: 'date' },
                  dateFinEvaluation: { type: 'string', format: 'date' },
                  resultatEvaluation: { type: 'string' },
                  idPatient: { type: 'integer' },
                  idMedecin: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Évaluation créée' }
        }
      }
    },

    // HOSPITALISATIONS
    '/api/hospitalisations': {
      get: {
        tags: ['Hospitalisations'],
        summary: 'Liste des hospitalisations',
        responses: {
          200: { description: 'Liste des hospitalisations' }
        }
      },
      post: {
        tags: ['Hospitalisations'],
        summary: 'Créer une hospitalisation',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  dateDebutHospitalisation: { type: 'string', format: 'date' },
                  dateFinHospitalisation: { type: 'string', format: 'date' },
                  motifHospitalisation: { type: 'string' },
                  idPatient: { type: 'integer' },
                  idMedecin: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Hospitalisation créée' }
        }
      }
    },

    // SUIVIS POST-IMPLANTATION
    '/api/suivis': {
      get: {
        tags: ['Suivis'],
        summary: 'Liste des suivis post-implantation',
        responses: {
          200: { description: 'Liste des suivis' }
        }
      },
      post: {
        tags: ['Suivis'],
        summary: 'Créer un suivi post-implantation',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  dateDebutSuivi: { type: 'string', format: 'date' },
                  dateFinSuivi: { type: 'string', format: 'date' },
                  resultatSuivi: { type: 'string' },
                  idPatient: { type: 'integer' },
                  idMedecin: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Suivi créé' }
        }
      }
    },
    //suivis incident
    '/api/incidents/:id/suivis': {
      post: {
        tags: ['Suivis-incident'],
        summary: 'Créer un suivi incident',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  dateSuivi: { type: 'string', format: 'date' },
                  actionsPrises: { type: 'string' },
                  idMedecin: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Suivi créé' }
        }
      },
      get: {
        tags: ['Suivis-incident'],
        summary: 'Liste des suivis incident',
        responses: {
          200: { description: 'Liste des suivis incident' }
        }
      }
    },
    //suivis etapes
    '/api/suivis/{id}/etapes': {
      get: {
        tags: ['Suivis-etapes'],
        summary: 'Liste des étapes pour un suivi post-implantation',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'ID du suivi post-implantation (idSuiviPost)'
          }
        ],
        responses: {
          200: {
            description: 'Liste des étapes de suivi',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      dateEtape: { type: 'string', format: 'date', example: '2024-02-20' },
                      typeEtape: { type: 'string', example: 'Réglage processeur' },
                      resultatEtape: { type: 'string', example: 'Amélioration significative' },
                      idSuiviPost: { type: 'integer', example: 3 },
                      idMedecin: { type: 'integer', example: 2 }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Suivis-etapes'],
        summary: 'Créer une étape pour un suivi post-implantation',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'ID du suivi post-implantation (idSuiviPost)'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  dateEtape: { type: 'string', format: 'date' },
                  typeEtape: { type: 'string' },
                  resultatEtape: { type: 'string' },
                  idMedecin: { type: 'integer' }
                },
                required: ['dateEtape', 'typeEtape']
              },
              example: {
                dateEtape: '2024-02-20',
                typeEtape: 'Réglage processeur',
                resultatEtape: 'Niveaux confort ajustés',
                idMedecin: 2
              }
            }
          }
        },
        responses: {
          201: { description: 'Étape de suivi créée' }
        }
      },
    },
    '/api/suivis/{id}/etapes/{idEtape}': {
      delete: {
        tags: ['Suivi post-implantation'],
        summary: 'Supprimer une étape de suivi',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
          { name: 'idEtape', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Étape supprimée' },
          404: { description: 'Étape ou suivi introuvable' }
        }
      }
    },

    //etape-evaluation
    '/api/evaluationsetapes': {
      get: {
        tags: ['Évaluations-etape'],
        summary: 'Liste des étapes pour une évaluation',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'ID de l’évaluation (idEvaluation)'
          }
        ],
        responses: {
          200: {
            description: 'Liste des étapes d’évaluation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {

                      id: { type: 'integer', example: 1 },
                      dateEtape: { type: 'string', format: 'date', example: '2024-01-10' },
                      typeEtape: { type: 'string', example: 'Audiométrie' },
                      resultatEtape: { type: 'string', example: 'Surdité profonde bilatérale' },
                      idEvaluation: { type: 'integer', example: 5 },
                      idMedecin: { type: 'integer', example: 2 }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Évaluations-etape'],
        summary: 'Créer une étape pour une évaluation',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'ID de l’évaluation (idEvaluation)'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  idEvaluation: { type: 'integer' },
                  dateEtape: { type: 'string', format: 'date' },
                  typeEtape: { type: 'string' },
                  resultatEtape: { type: 'string' },
                  idMedecin: { type: 'integer' }
                },
                required: ['  idEvaluation', 'dateEtape', 'typeEtape']
              },
              example: {
                idEvaluation: 1,
                dateEtape: '2024-01-10',
                typeEtape: 'Audiométrie',
                resultatEtape: 'Surdité profonde bilatérale',
                idMedecin: 2
              }
            }
          }
        },
        responses: {
          201: { description: 'Étape d’évaluation créée' }
        }
      }
    },
    '/api/evaluationsetapes/{id}': {
      delete: {
        tags: ['Évaluations-etape'],
        summary: 'Supprimer une étape d’évaluation',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Pose d’implant supprimée' }
        }
      }
    },

    //post-implant
    '/api/poses-implant': {
      get: {
        tags: ['Implants-poses'],
        summary: 'Liste des poses d’implant',
        responses: {
          200: {
            description: 'Liste des poses d’implant',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      dateOperation: { type: 'string', format: 'date', example: '2024-03-01' },
                      dureeOperation: { type: 'string', example: '02:15' },
                      detailsPose: { type: 'string', example: 'Insertion complète des électrodes' },
                      idHospitalisation: { type: 'integer', example: 4 },
                      idImplant: { type: 'integer', example: 2 },
                      idMedecin: { type: 'integer', example: 1 }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Implants-poses'],
        summary: 'Créer une pose d’implant',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  dateOperation: { type: 'string', format: 'date' },
                  dureeOperation: { type: 'string', example: '02:15' },
                  detailsPose: { type: 'string' },
                  idHospitalisation: { type: 'integer' },
                  idImplant: { type: 'integer' },
                  idMedecin: { type: 'integer' }
                },
                required: ['dateOperation', 'idHospitalisation', 'idImplant', 'idMedecin']
              },
              example: {
                dateOperation: '2024-03-01',
                dureeOperation: '02:15',
                detailsPose: 'Insertion complète des électrodes',
                idHospitalisation: 4,
                idImplant: 2,
                idMedecin: 1
              }
            }
          }
        },
        responses: {
          201: { description: 'Pose d’implant créée' }
        }
      }
    },

    '/api/poses-implant/{id}': {
      get: {
        tags: ['Implants-poses'],
        summary: 'Détails d’une pose d’implant',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: {
            description: 'Détails de la pose d’implant',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 1 },
                    dateOperation: { type: 'string', format: 'date', example: '2024-03-01' },
                    dureeOperation: { type: 'string', example: '02:15' },
                    detailsPose: { type: 'string', example: 'Insertion complète des électrodes' },
                    idHospitalisation: { type: 'integer', example: 4 },
                    idImplant: { type: 'integer', example: 2 },
                    idMedecin: { type: 'integer', example: 1 }
                  }
                }
              }
            }
          },
          404: { description: 'Pose d’implant introuvable' }
        }
      },


    },
    '/api/poses-implant/{id}': {
      delete: {
        tags: ['Implants-poses'],
        summary: 'Supprimer une pose d’implant',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Pose d’implant supprimée' }
        }
      }
    },
    // REGLAGES
    '/api/reglages': {
      get: {
        tags: ['Réglages'],
        summary: 'Liste des réglages',
        responses: {
          200: { description: 'Liste des réglages' }
        }
      },
      post: {
        tags: ['Réglages'],
        summary: 'Créer un réglage',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['dateReglage', 'typeReglage', 'idPatient', 'idImplant', 'idProcesseur', 'idMedecin'],
                properties: {
                  dateReglage: { type: 'string', format: 'date' },
                  typeReglage: { type: 'string' },
                  descriptionReglage: { type: 'string' },
                  resultatReglage: { type: 'string' },
                  idPatient: { type: 'integer' },
                  idImplant: { type: 'integer' },
                  idProcesseur: { type: 'integer' },
                  idMedecin: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Réglage créé' }
        }
      }
    }
  },
}

