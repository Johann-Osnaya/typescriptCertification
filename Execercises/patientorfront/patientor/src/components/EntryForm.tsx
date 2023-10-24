import { Button, TextField, Alert, Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material"
import {Entry, Patient, newEntry } from "../types"
import { useState } from "react"
import patientServices from "../services/patients"
import axios from "axios"
const EntryForm = ( {patient, setter} : {patient: Patient, setter: (params: any) => void }) => {

    const [visible, setVisible] = useState<boolean>(false)
    const [description, setDescription] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [specialist, setSpecialist] = useState<string>("")
    const [diagnosisCodes, setDiagnosisCodes] = useState<string>("")
    const [healthRating, setRating] = useState<string>("")
    const [error, setError] = useState<string>();
    const [select, setSelect] = useState<string>("HealthCheck")
    const style = {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 15,
        paddingRight:10,
        outlineStyle: "dashed",
        borderWidth: 1,
        marginBottom: 5
    }

    const handleChange = (event: SelectChangeEvent) => {
        setSelect(event.target.value)
    }

    const addnewEntry = async (e: React.FormEvent<HTMLFormElement>) => {
        let newEntry: newEntry;
        let data: Entry;
        try {
            e.preventDefault()
            const codes = diagnosisCodes.split(",")
            switch(select) {
                case "Healtcheck":
                    newEntry = {
                        description,
                        date,
                        specialist,
                        diagnosisCodes: codes,
                        healthCheckRating: Number(healthRating),
                        type: "HealthCheck"
                    };
                    data = await patientServices.addEntry(patient.id, newEntry)
                    setter({
                        ...patient,
                        entries: patient.entries.concat(data)
                    });
                    break;
                case "OccupationalHealthcare":
                    newEntry = {
                        description,
                        date,
                        employerName,
                        specialist,
                        diagnosisCodes: codes,
                        type: "OccupationalHealthcare"
                    };
                     data = await patientServices.addEntry(patient.id, newEntry)
                    setter({
                        ...patient,
                        entries: patient.entries.concat(data)
                    });
                    break;
                case "Hospital":
                    newEntry = {
                        description,
                        date,
                        specialist,
                        discharge,
                        diagnosisCodes: codes,
                        type: "Hospital"
                    };
                     data = await patientServices.addEntry(patient.id, newEntry)
                    setter({
                        ...patient,
                        entries: patient.entries.concat(data)
                    });
                    break;
                default:
                    console.log("Not an option.")
                    break;

            }
            setDescription("")
            setDate("")
            setSpecialist("")
            setDiagnosisCodes("")
            setRating("")
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                  const message = e.response.data.replace('Something went wrong. Error: ', '');
                  console.error(message);
                  setError(message);
                } else {
                  setError("Unrecognized axios error");
                }
              } else {
                console.error("Unknown error", e);
                setError("Unknown error");
              }
        }

    }
 
    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <br/>
        {!visible && <Button onClick={() => setVisible(!visible)} variant="contained">Add Entry</Button>}
        {visible &&
            <div style={style}>
            <form onSubmit={ (e) => addnewEntry(e)}>
            <b>New entry</b>
            <p>Select a entry type</p>
            <FormControl fullWidth variant="standard">
            <Select placeholder="Select a entry type" value={select}  onChange={handleChange}>
              <MenuItem value="HealthCheck" >HealthCheack</MenuItem>
              <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
            </Select>
            
            </FormControl> 
            <Button onClick={() => setVisible(!visible)} variant="contained" color="error" size="small">CANCEL</Button>
            <Button type="submit" disableElevation style={ { float: "right", marginBottom: 2 } } variant="contained" color="success">ADD</Button>
     
        </form>
            </div>

        }
        </div>

    )
}

export default EntryForm