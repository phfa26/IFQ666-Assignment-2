const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const logger = require('./middleware/logger.js');
const userRoutes = require('./routes/userRoutes.js');
const entryRoutes = require('./routes/entryRoutes.js');
const settingsRoutes = require('./routes/settingsRoutes.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use('/api/users', userRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/settings', settingsRoutes);

module.exports = app;
