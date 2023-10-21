const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./src/config/config');
const API_PREFIX = '/api/v1';

// Importar rutas
const usersRoutes = require('./src/routes/usersRoutes');
const patientRecordsRoutes = require('./src/routes/patientRecordsRoutes');

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analizar datos JSON
app.use(bodyParser.json());

// Rutas
app.use(`${API_PREFIX}/users`, usersRoutes);
app.use(`${API_PREFIX}/patientRecords`, patientRecordsRoutes);

// Puerto de escucha
const port = config.port;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
