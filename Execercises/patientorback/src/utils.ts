import { NewPatient, Gender } from "./types";


const toNewPatient = (object: unknown): NewPatient => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if('occupation' in object && 'gender' in object && 'ssn' in object && 'dateOfBirth' in object && 'name' in object && 'entries' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSNN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        }
        return newPatient;
    }
    
    throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatient;

const isString = (text: unknown ): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if(!isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const isDate = (date:string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date:' + date);
    }
    return date;
};

const parseSNN = (ssn: unknown): string => {
    if(!isString(ssn)) {
        throw new Error('Incorrect or missing');
    }
    return ssn;
};

const  isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
}