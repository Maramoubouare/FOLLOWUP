# FollowUp Suite - Frontend Documentation Guide

## 🌐 Language Options / Options de Langue
- [English Version](#english-version)
- [Version Française](#version-française)

---

<a name="english-version"></a>
# English Version

## 🚀 Overview
The FollowUp Suite is a high-precision clinical vigilance application designed for surgical departments. It facilitates the tracking of medical device incidents and their subsequent follow-up actions, ensuring compliance with international standards like IEC 62304.

## 🛠 Tech Stack
- **Core**: React 18 + Vite
- **UI Framework**: Material UI (MUI) v6
- **State Management & Data Fetching**: TanStack Query (React Query) v5
- **Icons**: Lucide React
- **Form Handling**: Formik + Zod (for validation)
- **Styling**: Emotion (MUI default) + Custom Inline Styles for layout precision

## 📂 Project Structure
The project follows a feature-based architecture:
- `src/features/incidents`: Core domain logic.
    - `components/`: UI views like `DashboardView`, `FollowUpPage`, etc.
- `src/hooks/`: Custom hooks for data fetching (`useIncidents`, `useSuivis`).
- `src/services/`: API communication layer. Supports both static mock data and live API modes.
- `src/shared/`: Reusable components (buttons, input fields) and utility functions.
- `src/contexts/`: Global state management, including `I18nContext` for translations.

## 🌍 Internationalization (i18n)
The app uses a custom `I18nContext` found in `src/contexts/I18nContext.jsx`.
- **Switching Languages**: Use the `LanguageSwitcher` component.
- **Adding Keys**: Update the `translations` object in `I18nContext.jsx`.
- **Usage**:
  ```javascript
  const { t } = useTranslation();
  return <p>{t('key_name')}</p>;
  ```

## 🔄 Data Fetching & Caching
We use TanStack Query for a robust caching layer.
- **Query Keys**: Standardized as `['incidents']` or `['suivis', id]`.
- **Invalidation**: When adding or deleting records, we invalidate the entire broad key (e.g., `['suivis']`) to ensure both specific and aggregate views refresh automatically.

---

<a name="version-française"></a>
# Version Française

## 🚀 Présentation
La Suite FollowUp est une application de vigilance clinique de haute précision conçue pour les services de chirurgie. Elle facilite le suivi des incidents liés aux dispositifs médicaux et les actions de suivi associées, garantissant la conformité aux normes internationales telles que l'IEC 62304.

## 🛠 Pile Technique
- **Cœur**: React 18 + Vite
- **Framework UI**: Material UI (MUI) v6
- **Gestion d'État et Récupération de Données**: TanStack Query (React Query) v5
- **Icônes**: Lucide React
- **Gestion des Formulaires**: Formik + Zod (pour la validation)
- **Style**: Emotion (MUI par défaut) + Styles en ligne personnalisés pour la précision de la mise en page

## 📂 Structure du Projet
Le projet suit une architecture basée sur les fonctionnalités ("features") :
- `src/features/incidents`: Logique métier principale.
    - `components/`: Vues UI comme `DashboardView`, `FollowUpPage`, etc.
- `src/hooks/`: Hooks personnalisés pour la récupération de données (`useIncidents`, `useSuivis`).
- `src/services/`: Couche de communication API. Prend en charge les données simulées (mock) et les modes API réels.
- `src/shared/`: Composants réutilisables (boutons, champs de saisie) et fonctions utilitaires.
- `src/contexts/`: Gestion de l'état global, y compris `I18nContext` pour les traductions.

## 🌍 Internationalisation (i18n)
L'application utilise un `I18nContext` personnalisé situé dans `src/contexts/I18nContext.jsx`.
- **Changement de Langue**: Utilisez le composant `LanguageSwitcher`.
- **Ajout de Clés**: Mettez à jour l'objet `translations` dans `I18nContext.jsx`.
- **Utilisation**:
  ```javascript
  const { t } = useTranslation();
  return <p>{t('nom_de_la_cle')}</p>;
  ```

## 🔄 Récupération et Mise en Cashe des Données
Nous utilisons TanStack Query pour une couche de mise en cache robuste.
- **Clés de Requête (Query Keys)**: Standardisées sous forme de `['incidents']` ou `['suivis', id]`.
- **Invalidation**: Lors de l'ajout ou de la suppression d'enregistrements, nous invalidons l'intégralité de la clé parente (ex: `['suivis']`) pour garantir que les vues spécifiques et agrégées se rafraîchissent automatiquement.
