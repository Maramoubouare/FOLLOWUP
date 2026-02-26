-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 17 fév. 2026 à 18:45
-- Version du serveur : 9.1.0
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `followup`
--

-- --------------------------------------------------------

--
-- Structure de la table `etapeevaluation`
--

DROP TABLE IF EXISTS `etapeevaluation`;
CREATE TABLE IF NOT EXISTS `etapeevaluation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateEtape` date NOT NULL,
  `typeEtape` varchar(100) NOT NULL,
  `resultatEtape` text,
  `idEvaluation` int NOT NULL,
  `idMedecin` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idEvaluation` (`idEvaluation`),
  KEY `idMedecin` (`idMedecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `etapesuivi`
--

DROP TABLE IF EXISTS `etapesuivi`;
CREATE TABLE IF NOT EXISTS `etapesuivi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateEtape` date NOT NULL,
  `typeEtape` varchar(100) NOT NULL,
  `resultatEtape` text,
  `idSuiviPost` int NOT NULL,
  `idMedecin` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idSuiviPost` (`idSuiviPost`),
  KEY `idMedecin` (`idMedecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hospitalisation`
--

DROP TABLE IF EXISTS `hospitalisation`;
CREATE TABLE IF NOT EXISTS `hospitalisation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateDebutHospitalisation` date NOT NULL,
  `dateFinHospitalisation` date DEFAULT NULL,
  `motifHospitalisation` text,
  `idPatient` int NOT NULL,
  `idMedecin` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPatient` (`idPatient`),
  KEY `idMedecin` (`idMedecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `implant`
--

DROP TABLE IF EXISTS `implant`;
CREATE TABLE IF NOT EXISTS `implant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeImplant` varchar(100) NOT NULL,
  `datePose` date NOT NULL,
  `nombreElectrodes` int NOT NULL,
  `idProcesseur` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idProcesseur` (`idProcesseur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `incident`
--

DROP TABLE IF EXISTS `incident`;
CREATE TABLE IF NOT EXISTS `incident` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateIncident` date NOT NULL,
  `heureIncident` time DEFAULT NULL,
  `gravite` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `idPatient` int NOT NULL,
  `idImplant` int DEFAULT NULL,
  `idProcesseur` int DEFAULT NULL,
  `idMedecin` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPatient` (`idPatient`),
  KEY `idImplant` (`idImplant`),
  KEY `idProcesseur` (`idProcesseur`),
  KEY `idMedecin` (`idMedecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `medecin`
--

DROP TABLE IF EXISTS `medecin`;
CREATE TABLE IF NOT EXISTS `medecin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `specialite` varchar(100) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `patient`
--

DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `dateNaissance` date NOT NULL,
  `sexe` varchar(20) NOT NULL,
  `adresse` varchar(500) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dateImplantation` date DEFAULT NULL,
  `idImplant` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idImplant` (`idImplant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `phaseevaluation`
--

DROP TABLE IF EXISTS `phaseevaluation`;
CREATE TABLE IF NOT EXISTS `phaseevaluation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateDebutEvaluation` date NOT NULL,
  `dateFinEvaluation` date DEFAULT NULL,
  `resultatEvaluation` text,
  `idPatient` int NOT NULL,
  `idMedecin` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPatient` (`idPatient`),
  KEY `idMedecin` (`idMedecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `poseimplant`
--

DROP TABLE IF EXISTS `poseimplant`;
CREATE TABLE IF NOT EXISTS `poseimplant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateOperation` date NOT NULL,
  `dureeOperation` time DEFAULT NULL,
  `detailsPose` text,
  `idHospitalisation` int NOT NULL,
  `idImplant` int NOT NULL,
  `idMedecin` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idHospitalisation` (`idHospitalisation`),
  KEY `idImplant` (`idImplant`),
  KEY `idMedecin` (`idMedecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `processeur`
--

DROP TABLE IF EXISTS `processeur`;
CREATE TABLE IF NOT EXISTS `processeur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeProcesseur` varchar(100) NOT NULL,
  `dateInstallation` date NOT NULL,
  `batterie` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rendezvous`
--

DROP TABLE IF EXISTS `rendezvous`;
CREATE TABLE IF NOT EXISTS `rendezvous` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateRendezVous` datetime NOT NULL,
  `motif` varchar(500) NOT NULL,
  `idPatient` int NOT NULL,
  `idMedecin` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPatient` (`idPatient`),
  KEY `idMedecin` (`idMedecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `suiviincident`
--

DROP TABLE IF EXISTS `suiviincident`;
CREATE TABLE IF NOT EXISTS `suiviincident` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateSuivi` date NOT NULL,
  `actionsPrises` text NOT NULL,
  `idIncident` int NOT NULL,
  `idMedecin` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idIncident` (`idIncident`),
  KEY `idMedecin` (`idMedecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `suivipostimplantation`
--

DROP TABLE IF EXISTS `suivipostimplantation`;
CREATE TABLE IF NOT EXISTS `suivipostimplantation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateDebutSuivi` date NOT NULL,
  `dateFinSuivi` date DEFAULT NULL,
  `resultatSuivi` text,
  `idPatient` int NOT NULL,
  `idMedecin` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPatient` (`idPatient`),
  KEY `idMedecin` (`idMedecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `suivireglage`
--

DROP TABLE IF EXISTS `suivireglage`;
CREATE TABLE IF NOT EXISTS `suivireglage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateReglage` date NOT NULL,
  `typeReglage` varchar(100) NOT NULL,
  `descriptionReglage` text,
  `resultatReglage` text,
  `idPatient` int NOT NULL,
  `idImplant` int NOT NULL,
  `idProcesseur` int NOT NULL,
  `idMedecin` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPatient` (`idPatient`),
  KEY `idImplant` (`idImplant`),
  KEY `idProcesseur` (`idProcesseur`),
  KEY `idMedecin` (`idMedecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `etapeevaluation`
--
ALTER TABLE `etapeevaluation`
  ADD CONSTRAINT `etapeevaluation_ibfk_1` FOREIGN KEY (`idEvaluation`) REFERENCES `phaseevaluation` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `etapeevaluation_ibfk_2` FOREIGN KEY (`idMedecin`) REFERENCES `medecin` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `etapesuivi`
--
ALTER TABLE `etapesuivi`
  ADD CONSTRAINT `etapesuivi_ibfk_1` FOREIGN KEY (`idSuiviPost`) REFERENCES `suivipostimplantation` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `etapesuivi_ibfk_2` FOREIGN KEY (`idMedecin`) REFERENCES `medecin` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `hospitalisation`
--
ALTER TABLE `hospitalisation`
  ADD CONSTRAINT `hospitalisation_ibfk_1` FOREIGN KEY (`idPatient`) REFERENCES `patient` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `hospitalisation_ibfk_2` FOREIGN KEY (`idMedecin`) REFERENCES `medecin` (`id`) ON DELETE RESTRICT;

--
-- Contraintes pour la table `implant`
--
ALTER TABLE `implant`
  ADD CONSTRAINT `implant_ibfk_1` FOREIGN KEY (`idProcesseur`) REFERENCES `processeur` (`id`) ON DELETE RESTRICT;

--
-- Contraintes pour la table `incident`
--
ALTER TABLE `incident`
  ADD CONSTRAINT `incident_ibfk_1` FOREIGN KEY (`idPatient`) REFERENCES `patient` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `incident_ibfk_2` FOREIGN KEY (`idImplant`) REFERENCES `implant` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `incident_ibfk_3` FOREIGN KEY (`idProcesseur`) REFERENCES `processeur` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `incident_ibfk_4` FOREIGN KEY (`idMedecin`) REFERENCES `medecin` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`idImplant`) REFERENCES `implant` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `phaseevaluation`
--
ALTER TABLE `phaseevaluation`
  ADD CONSTRAINT `phaseevaluation_ibfk_1` FOREIGN KEY (`idPatient`) REFERENCES `patient` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `phaseevaluation_ibfk_2` FOREIGN KEY (`idMedecin`) REFERENCES `medecin` (`id`) ON DELETE RESTRICT;

--
-- Contraintes pour la table `poseimplant`
--
ALTER TABLE `poseimplant`
  ADD CONSTRAINT `poseimplant_ibfk_1` FOREIGN KEY (`idHospitalisation`) REFERENCES `hospitalisation` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `poseimplant_ibfk_2` FOREIGN KEY (`idImplant`) REFERENCES `implant` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `poseimplant_ibfk_3` FOREIGN KEY (`idMedecin`) REFERENCES `medecin` (`id`) ON DELETE RESTRICT;

--
-- Contraintes pour la table `rendezvous`
--
ALTER TABLE `rendezvous`
  ADD CONSTRAINT `rendezvous_ibfk_1` FOREIGN KEY (`idPatient`) REFERENCES `patient` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rendezvous_ibfk_2` FOREIGN KEY (`idMedecin`) REFERENCES `medecin` (`id`) ON DELETE RESTRICT;

--
-- Contraintes pour la table `suiviincident`
--
ALTER TABLE `suiviincident`
  ADD CONSTRAINT `suiviincident_ibfk_1` FOREIGN KEY (`idIncident`) REFERENCES `incident` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `suiviincident_ibfk_2` FOREIGN KEY (`idMedecin`) REFERENCES `medecin` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `suivipostimplantation`
--
ALTER TABLE `suivipostimplantation`
  ADD CONSTRAINT `suivipostimplantation_ibfk_1` FOREIGN KEY (`idPatient`) REFERENCES `patient` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `suivipostimplantation_ibfk_2` FOREIGN KEY (`idMedecin`) REFERENCES `medecin` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `suivireglage`
--
ALTER TABLE `suivireglage`
  ADD CONSTRAINT `suivireglage_ibfk_1` FOREIGN KEY (`idPatient`) REFERENCES `patient` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `suivireglage_ibfk_2` FOREIGN KEY (`idImplant`) REFERENCES `implant` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `suivireglage_ibfk_3` FOREIGN KEY (`idProcesseur`) REFERENCES `processeur` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `suivireglage_ibfk_4` FOREIGN KEY (`idMedecin`) REFERENCES `medecin` (`id`) ON DELETE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
