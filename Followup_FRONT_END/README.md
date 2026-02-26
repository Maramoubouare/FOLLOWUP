# FollowUp Suite 🩺

The Standard d'Excellence for Clinical Vigilance.

A high-precision clinical vigilance application designed for surgical departments to track medical device incidents and follow-up actions with uncompromising IEC 62304 compliance.

## 📺 Demo

![FollowUp Suite Demo](./demo_video.mp4)

*(Note: If the video doesn't play, please download it or check the walkthrough artifact)*

## 🚀 Key Features

- **⚡️ High-Precision Tracking**: Real-time monitoring of clinical incidents.
- **🌍 Internationalization (i18n)**: Full English and French support for both interface and documentation.
- **🛡️ Regulatory Compliance**: Designed for IEC 62304, ISO 13485, and GDPR/HIPAA standards.
- **📊 Neural Analytics**: Predictive modeling for hardware fatigure and implant migration.
- **📑 Full Traceability**: Immutable audit trails from surgery to resolution.
- **🎨 Premium UI**: Modern, responsive dashboard built with Material UI v6 and Jakarta Sans typography.

## 🛠 Tech Stack

- **Core**: React 18 + Vite
- **UI Framework**: Material UI (MUI) v6
- **State Management**: TanStack Query (React Query) v5
- **Icons**: Lucide React
- **Form Handling**: Formik + Zod (Validation)
- **i18n**: Custom Context-based Internationalization

## 📂 Project Structure

```plaintext
src/
├── contexts/        # I18n and Global Contexts
├── features/        # Feature-based architecture
│   └── incidents/   # Incident & Follow-up logic
├── hooks/           # Custom TanStack Query hooks
├── services/        # API and Mock Service layer
├── shared/          # Reusable UI components & Utils
└── assets/          # Typographies and Static Assets
```

## 🛠 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## 📄 Documentation

For a detailed technical guide in English and French, see [FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md).

## ⚖️ Legal & Compliance

© 2024 FollowUp Clinical Systems. Produced for CHU de Montpellier Surgery Units.
Validated for International Biomedical Standards.
