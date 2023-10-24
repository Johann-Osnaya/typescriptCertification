import patients from "../data/patients";
import { newEntry, NewPatient, NonSentivePatient, Patient, Entry } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSentivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ 
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findById = (id: string) => {
    return patients.find(p => p.id === id)
}

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {
        id: id,
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (entry : newEntry, ID: string): Entry => {
    const id = uuid();
    if(entry.type === "HealthCheck") {
        if(entry.healthCheckRating === undefined || !entry.specialist !|| !entry.date ||!entry.description) {
          throw new Error('Missing information');
        }
    } else if (entry.type === "OccupationalHealthcare") {
        if(!entry.employerName || !entry.specialist || !entry.date || !entry.description|| !entry?.sickLeave || !entry?.diagnosisCodes)
        throw new Error('Missing information');
    } else {
        if(!entry.discharge || !entry.specialist || !entry.date || !entry.description || !entry?.diagnosisCodes)
        throw new Error('Missing information');
        
    }
    const newEntry = {
        id: id,
        ...entry
    }
    patients.find(p => p.id === ID)?.entries.push(newEntry)
    return newEntry;
};

export default {
    getPatients,
    addPatient,
    findById,
    addEntry
};