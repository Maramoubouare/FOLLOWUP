require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const { testConnection } = require('./config/database');
const logger = require('./utils/logger');
const apiRoutes = require('./routes');
const swaggerDocument = require('./config/swaggerComplete');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Documentation Swagger COMPLÈTE
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'FollowUp API - Documentation'
}));

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'FollowUp API opérationnelle',
    version: '1.0.0',
    documentation: `http://localhost:${PORT}/api-docs`
  });
});

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
  logger.error('Erreur:', err);
  res.status(500).json({ success: false, message: 'Erreur serveur' });
});

async function startServer() {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════╗
║   FollowUp API - CHU Montpellier                      ║
║   Port: ${PORT}                                            ║
║   Doc Swagger: http://localhost:${PORT}/api-docs         ║
╚═══════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;
