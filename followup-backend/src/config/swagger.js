/**
 * Configuration Swagger / OpenAPI
 * FollowUp - CHU de Montpellier
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FollowUp API - Gestion des Incidents',
      version: '1.0.0',
      description: `
        API REST pour la gestion des incidents d'implants cochléaires
        
        **CHU de Montpellier - Service ORL**
        
        ### Conformité
        - IEC 62304 : Classe B (blessure possible)
        - ANSSI : Sécurité des données de santé
        - RGPD : Protection des données personnelles
        
        ### Fonctionnalités
        - Déclaration d'incidents par les patients
        - Suivi des incidents par l'équipe médicale
        - Traçabilité complète des actions
        
        ### Niveaux de gravité
        - **Mineur** : Gêne légère, pas d'impact fonctionnel majeur
        - **Modéré** : Inconfort notable, fonction partiellement dégradée
        - **Majeur** : Perte significative de fonction auditive
        - **Critique** : Douleur intense ou risque pour le patient
      `,
      contact: {
        name: 'Support FollowUp',
        email: 'support.followup@chu-montpellier.fr'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      },
      {
        url: 'https://api.followup.chu-montpellier.fr',
        description: 'Serveur de production'
      }
    ],
    tags: [
      {
        name: 'Incidents',
        description: 'Gestion des incidents d\'implants cochléaires'
      },
      {
        name: 'Suivis',
        description: 'Suivi des actions sur les incidents'
      },
      {
        name: 'Patients',
        description: 'Opérations liées aux patients'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;
