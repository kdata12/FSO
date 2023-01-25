import { patientData } from "../data/patients";
import { PatientNoSSN } from "../types";

const getAllPatientNoSSN = (): PatientNoSSN[] => {
    return patientData.map(patient => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    }));
};

export default { getAllPatientNoSSN };