const PatientRecord = require("../models/patientRecordModel");

// Controlador para crear un nuevo registro de paciente
exports.createPatientRecord = async (req, res) => {
  const { patientId } = req.body;

  try {
    const existingPatientRecord = await PatientRecord.findOne({ patientId });
    if (existingPatientRecord) {
      return res.status(400).json({ message: "El registro del paciente ya existe" });
    }

    // Crea un nuevo registro de paciente
    const patientRecord = new PatientRecord(req.body);
    await patientRecord.save();

    res.status(201).json({ message: "Registro del paciente creado exitosamente" });
  } catch (error) {
    console.error("Error al crear un registro de paciente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para obtener un registro de paciente por su ID
exports.getPatientRecordById = async (req, res) => {
  const id = req.params.id;

  try {
    const patientRecord = await PatientRecord.findById(id);
    if (!patientRecord) {
      return res
        .status(404)
        .json({ mensaje: "Registro de paciente no encontrado" });
    }

    res.status(200).json(patientRecord);
  } catch (error) {
    console.error("Error al obtener el registro de paciente: ", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Controlador para obtener la lista completa de registros de pacientes
exports.getAllPatientRecords = async (req, res) => {
  try {
    const patientRecords = await PatientRecord.find(); // Obtener todos los registros de pacientes

    res.status(200).json(patientRecords);
  } catch (error) {
    console.error(
      "Error al obtener la lista de registros de pacientes: ",
      error
    );
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Controlador para actualizar un registro de paciente por su ID
exports.updatePatientRecord = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedPatientRecord = await PatientRecord.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedPatientRecord) {
      return res
        .status(404)
        .json({ mensaje: "Registro de paciente no encontrado" });
    }

    res.status(200).json(updatedPatientRecord);
  } catch (error) {
    console.error("Error al actualizar el registro de paciente:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Controlador para eliminar un registro de paciente por su ID
exports.deletePatientRecord = async (req, res) => {
  const id = req.params.id;

  try {
    const removedPatientRecord = await PatientRecord.findByIdAndRemove(id);

    if (!removedPatientRecord) {
      return res
        .status(404)
        .json({ mensaje: "Registro de paciente no encontrado" });
    }

    res
      .status(200)
      .json({ mensaje: "Registro de paciente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el registro de paciente:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
