import { useParams } from "react-router-dom";
import { Diagnosis, Gender, Patient } from "../types";
import { useState, useEffect } from 'react'
import axios from "axios";
import { Male, Female } from "@mui/icons-material";
import Details from "./Details";
import EntryForm from "./EntryForm";
const PatientInfo = ( ) => {
    const {id} = useParams<{id: string}>()
    const [patient, setPatient] = useState<Patient>()
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>()

    useEffect(() => {
        const findPatient = async () => {
            const  pat = await axios.get<Patient>(`http://localhost:3001/api/patients/${id}`)
            if(!pat.data){
                throw new Error("Patient not found");
            }
            setPatient(pat.data)
            const diagnosis = await axios.get<Diagnosis[]>('http://localhost:3001/api/diagnoses')
            if(!diagnosis.data)
            {
                throw new Error('Error fetching diagnosis');
                
            }
            setDiagnoses(diagnosis.data)
        }
    findPatient()
    },[id])
    
    if(!patient || !diagnoses){
        return <p>Patient not found :(</p>
    } else {
        const gender = patient.gender === Gender.Male ? <Male/> : patient.gender === Gender.Female ? <Female/> : '' 
        return (
            <div>
                <h1>{patient.name} {gender}</h1>
                ssh: {patient.ssn}<p></p>
                occupation: {patient.occupation}
                <br/>
                <br/>
                <EntryForm patient={patient} setter={setPatient}/>
                {patient.entries[0] && 
                <div>
                    <h3>Entries</h3>
                {patient.entries.map(entry => {
                    return (
                        <Details key={entry.id} data={entry} />
                        )
                    }
                )}
                    </div>}
                <br/>

            </div>
        )
    }
}

export default PatientInfo;