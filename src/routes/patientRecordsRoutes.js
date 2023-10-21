const express = require('express');
const router = express.Router();
const patientRecordsControllers = require('../controllers/patientRecordsControllers');
const { protectRoute } = require('../config/jwt');

// Proteger todas las rutas
router.use(protectRoute);

// Ruta para crear un nuevo registro de paciente
router.post('/', patientRecordsControllers.createPatientRecord);

// Ruta para obtener un registro de paciente
router.get('/:id', patientRecordsControllers.getPatientRecordById);

// Ruta para obtener un registro de pacientees
router.get('/', patientRecordsControllers.getAllPatientRecords);

// Ruta para actualizar un registro de paciente
router.put('/:id', patientRecordsControllers.updatePatientRecord);

// Ruta para eliminar un registro de paciente
router.delete('/:id', patientRecordsControllers.deletePatientRecord);

module.exports = router;
