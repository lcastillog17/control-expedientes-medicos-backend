const mongoose = require("../config/database");

const patientRecordSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },
  medicalHistory: {
    priorConditions: [String],
    allergies: [String],
    currentMedications: [String],
  },
});

const Patient = mongoose.model("PatientRecord", patientRecordSchema);

module.exports = Patient;
