# FollowUp Backend Complet

**API REST complète pour l'application FollowUp - CHU de Montpellier**

## 📦 Modules inclus

Ce backend contient **TOUS** les modules de FollowUp :

✅ **Patients** - Gestion des patients implantés  
✅ **Médecins** - Équipe médicale ORL  
✅ **Implants** - Dispositifs cochléaires  
✅ **Processeurs** - Processeurs vocaux externes  
✅ **Incidents** - Déclaration et suivi (Module TP06)  
✅ **Évaluations** - Phase pré-implantation  
✅ **Hospitalisations** - Séjours hospitaliers  
✅ **Poses d'implants** - Interventions chirurgicales  
✅ **Suivis post-implantation** - Suivi long terme  
✅ **Rendez-vous** - Planning consultations  
✅ **Réglages** - Ajustements processeurs  

## 🚀 Installation rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer .env
cp .env.example .env
# Éditer .env avec vos paramètres MySQL

# 3. Créer la base de données
mysql -u root -p < create_database_followup.sql

# 4. Lancer le serveur
npm run dev
```

## 📋 Endpoints disponibles

### Patients
- `GET /api/patients` - Liste tous les patients
- `GET /api/patients/:id` - Détails d'un patient
- `POST /api/patients` - Créer un patient
- `PUT /api/patients/:id` - Modifier un patient
- `DELETE /api/patients/:id` - Supprimer un patient
- `GET /api/patients/search?q=...` - Rechercher
- `GET /api/patients/:id/incidents` - Incidents du patient

### Médecins
- `GET /api/medecins` - Liste médecins
- `GET /api/medecins/:id` - Détails médecin
- `POST /api/medecins` - Créer médecin
- `PUT /api/medecins/:id` - Modifier médecin
- `DELETE /api/medecins/:id` - Désactiver médecin
- `GET /api/medecins/:id/patients` - Patients du médecin
- `GET /api/medecins/:id/agenda` - Agenda du médecin
- `GET /api/medecins/:id/statistiques` - Stats du médecin

### Implants
- `GET /api/implants` - Liste implants
- `GET /api/implants/:id` - Détails implant
- `POST /api/implants` - Créer implant
- `PUT /api/implants/:id` - Modifier implant
- `DELETE /api/implants/:id` - Supprimer implant
- `GET /api/implants/:id/reglages` - Réglages de l'implant
- `GET /api/implants/:id/incidents` - Incidents de l'implant
- `GET /api/implants/:id/statistiques` - Stats de l'implant

### Processeurs
- `GET /api/processeurs` - Liste processeurs
- `GET /api/processeurs/:id` - Détails processeur
- `POST /api/processeurs` - Créer processeur
- `PUT /api/processeurs/:id` - Modifier processeur
- `DELETE /api/processeurs/:id` - Supprimer processeur
- `GET /api/processeurs/:id/reglages` - Réglages du processeur
- `GET /api/processeurs/:id/incidents` - Incidents du processeur

### Incidents (Module TP06)
- `POST /api/incidents` - Créer un incident
- `GET /api/incidents/:id` - Détails incident
- `PUT /api/incidents/:id` - Modifier incident
- `DELETE /api/incidents/:id` - Supprimer incident
- `POST /api/incidents/:id/suivis` - Ajouter un suivi
- `GET /api/incidents/:id/suivis` - Historique suivis

### Évaluations
- `GET /api/evaluations` - Liste phases d'évaluation
- `POST /api/evaluations` - Créer une phase
- `GET /api/evaluations/:id/etapes` - Étapes d'une phase
- `POST /api/evaluations/:id/etapes` - Ajouter une étape

### Hospitalisations
- `GET /api/hospitalisations` - Liste hospitalisations
- `POST /api/hospitalisations` - Créer hospitalisation

### Poses d'implants
- `GET /api/poses-implants` - Liste poses
- `POST /api/poses-implants` - Enregistrer une pose

### Suivis post-implantation
- `GET /api/suivis-post-implantation` - Liste suivis
- `POST /api/suivis-post-implantation` - Créer suivi
- `GET /api/suivis-post-implantation/:id/etapes` - Étapes du suivi
- `POST /api/suivis-post-implantation/:id/etapes` - Ajouter étape

### Rendez-vous
- `GET /api/rendez-vous` - Liste RDV
- `POST /api/rendez-vous` - Créer RDV
- `PUT /api/rendez-vous/:id` - Modifier RDV
- `DELETE /api/rendez-vous/:id` - Annuler RDV

### Réglages
- `GET /api/reglages` - Liste réglages
- `POST /api/reglages` - Créer réglage
- `GET /api/reglages/:id` - Détails réglage

## 🔧 Technologies

- **Node.js** 18+
- **Express** 4.18
- **MySQL** 8.0+
- **Winston** (logging)
- **Joi** (validation)
- **Swagger** (documentation)

## 📚 Documentation API

Accédez à la documentation interactive :
```
http://localhost:3000/api-docs
```

## 🏗️ Structure

```
followup-backend-complet/
├── src/
│   ├── config/          # Configuration DB, Swagger
│   ├── controllers/     # Logique métier
│   ├── models/          # Modèles de données
│   ├── routes/          # Routes API
│   ├── utils/           # Utilitaires (logger)
│   ├── validators/      # Validation Joi
│   └── server.js        # Serveur Express
├── docs/                # Documentation
├── package.json
└── README.md
```

## 🎯 Pour le Frontend

Ce backend expose une API REST complète pour votre frontend React/Vue/Angular.

**Exemple d'utilisation :**


## 📝 Licence

MIT - CHU de Montpellier

---

**Version:** 1.0.0  
**Auteur:** FollowUp Team  
**Contact:** support.followup@chu-montpellier.fr
