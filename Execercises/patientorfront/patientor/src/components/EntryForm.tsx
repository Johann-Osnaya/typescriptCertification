import { Button, Alert, Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material"
import {Patient } from "../types"
import { useState } from "react"
import EntryType from "./EntryType"
const EntryForm = ( {patient, setter} : {patient: Patient, setter: (params: any) => void }) => {
    const [error, setError] = useState<string>();
    const [select, setSelect] = useState<string>("HealthCheck")
    const [visible, setVisible] = useState<boolean>(false)
    const style = {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight:10,
        outlineStyle: "dashed",
        borderWidth: 1,
        marginBottom: 5
    }

    const handleChange = (event: SelectChangeEvent) => {
        
    }

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <br/>
        {!visible && <Button onClick={() => setVisible(!visible)} variant="contained">Add Entry</Button>}
        {visible &&
        
            <div style={style}>
            <b>New entry</b>
            <p>Select a entry type</p>
            <FormControl fullWidth variant="standard">
            <Select placeholder="Select a entry type" value={select}  onChange={(e) => setSelect(e.target.value)}>
              <MenuItem value="HealthCheck" >HealthCheck</MenuItem>
              <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
            </Select>
            <EntryType select={select} patient={patient} setter={setter} errorSetter={setError}  setVisible={setVisible} visible={visible}/>
            </FormControl> 
            </div>

        }
        </div>

    )
}

export default EntryForm