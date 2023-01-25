export type Latin = string | undefined;

export type Gender = "male" | "female";

export type PatientNoSSN = Omit<Patient, 'ssn'>;

export interface Diagnose {
    code: string,
    name: string,
    latin?: Latin,
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
}