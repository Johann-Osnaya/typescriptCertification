import { TextField } from "@mui/material";

interface Params  {
    description: string,
    date: string,
    specialist: string,
    healthRating: string,
    diagnosisCodes: string[],
    setDescription: (e: string) => void,
    setDate: (e:  string) => void,
    setSpecialist: (e:  string) => void,
    setRating: (e:  string) => void,
    setDiagnosisCodes: (e:  string) => void
    
}

const HealtcheckForm = ({description, date, specialist, healthRating, diagnosisCodes, setDescription, setDate, setSpecialist, setRating, setDiagnosisCodes} : Params) => {
    return (
        <div>
            <br/>
            <br/>
            <TextField value={description} onChange={(e) => setDescription(e.target.value)} fullWidth  label="Description" variant="standard" aria-label="Description"></TextField>
            <br/>
            <br/>
            <TextField value={date} onChange={(e) => setDate(e.target.value)} fullWidth  label="Date" variant="standard" aria-label="Date"></TextField>
            <br/>
            <br/>
            <TextField value={specialist} onChange={(e) => setSpecialist(e.target.value)} fullWidth  label="Specialist" variant="standard" aria-label="Specialist"></TextField>
            <br/>
            <br/>
            <TextField value={healthRating} onChange={(e) => setRating(e.target.value)} fullWidth  label="Healthcheck rating" variant="standard" aria-label="HealthcheckRating"></TextField>
            <br/>
            <br/>
            <TextField value={diagnosisCodes} onChange={(e) => setDiagnosisCodes(e.target.value)} fullWidth  label="Diagnosis codes" variant="standard" aria-label="Diagnosis"></TextField>
            <br/>
            <br/>
        </div>
    )
}

export default HealtcheckForm;