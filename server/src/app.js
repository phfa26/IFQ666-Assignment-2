const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { swaggerUi, swaggerDocs } = require('./swagger');

dotenv.config();

const logger = require('./middleware/logger.js');
const userRoutes = require('./routes/userRoutes.js');
const entryRoutes = require('./routes/entryRoutes.js');
const settingsRoutes = require('./routes/settingsRoutes.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Swagger UI Setup - serves the Swagger UI documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/settings', settingsRoutes);

module.exports = app;
