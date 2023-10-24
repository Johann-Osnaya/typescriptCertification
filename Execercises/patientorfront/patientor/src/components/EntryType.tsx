import {Entry, Patient , newEntry } from "../types"
import patientServices from "../services/patients"
import {useState} from "react"
import { TextField, Button, MenuItem} from "@mui/material"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField'
import { Dayjs } from 'dayjs';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import axios from "axios"
import React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const codes = [
    "M24.2",
    "M51.2",
    "S03.5",
    "J10.1",
    "J06.9",
    "Z57.1",
    "N30.0",
    "H54.7",
    "J03.0",
    "L60.1",
    "Z74.3",
    "L20",
    "S62.5",
    "H35.29"
  ];

function getStyles(code: string, codes: string[], theme: Theme) {
    return {
      fontWeight:
        codes.indexOf(code) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const EntryType = ({setter, select, patient, errorSetter, setVisible, visible} : {patient: Patient ,setter: (params: any) => void, select: string, errorSetter:(params: any) => void, setVisible: (params: any) => void, visible: boolean}) => {
    const theme = useTheme();

    const [description, setDescription] = useState<string>("")
    const [date, setDate] = React.useState<Dayjs | null>();
    const [specialist, setSpecialist] = useState<string>("")
    const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);
    const [healthRating, setRating] = useState<string>("")
    const [employerName, setEmployerName] = useState<string>("")
    const [startDate, setstartDate] = React.useState<Dayjs | null>();
    const [endDate, setEndDate] = React.useState<Dayjs | null>();
    const [dischargeDate, setDischargeDate] = React.useState<Dayjs | null>();
    const [criteria, setCriteria] = useState<string>("")

    
  const handleChange = (event: SelectChangeEvent<typeof codes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

    const addnewEntry = async (e: React.FormEvent<HTMLFormElement>) => {
        let newEntry: newEntry;
        let data: Entry;
        try {
                e.preventDefault()
            switch(select) {
                case "HealthCheck":
                    if(date) {
                        newEntry = {
                            description,
                            date: date.toString(),
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
                    }
 
                    break;
                case "OccupationalHealthcare":
                    if(startDate && endDate && date) {
                        newEntry = {
                            description,
                            date: date.toString(),
                            employerName,
                            specialist,
                            diagnosisCodes: codes,
                            type: "OccupationalHealthcare",
                            sickLeave: {
                                startDate: startDate.toString(),
                                endDate: endDate.toString()
                            }
                        };
                         data = await patientServices.addEntry(patient.id, newEntry)
                        setter({
                            ...patient,
                            entries: patient.entries.concat(data)
                        });
                    }
                    break;
                case "Hospital":
                    if( date && dischargeDate) {
                        newEntry = {
                            description,
                            date: date.toString(),
                            specialist,
                            discharge: {
                                date: dischargeDate.toString(),
                                criteria
                            },
                            diagnosisCodes: codes,
                            type: "Hospital"
                        };
                         data = await patientServices.addEntry(patient.id, newEntry)
                        setter({
                            ...patient,
                            entries: patient.entries.concat(data)
                        });
                    }
                    break;
                default:
                    console.log("Not an option.")
                    break;

            }
            setDescription("")
            setDate(null)
            setSpecialist("")
            setDiagnosisCodes([])
            setRating("")
            setDischargeDate(null)
            setEmployerName("")
            setEndDate(null)
            setstartDate(null)
            setCriteria("")
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                  const message = e.response.data.replace('Something went wrong. Error: ', '');
                  console.error(message);
                  errorSetter(message);
                } else {
                  errorSetter("Unrecognized axios error");
                }
              } else {
                console.error("Unknown error", e);
                errorSetter("Unknown error");
              }
        }

    }
    if(select === "HealthCheck")
        {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={addnewEntry}>
            <div>
                <br/>
                <br/>
                <TextField value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} fullWidth  label="Description" variant="standard" aria-label="Description"></TextField>
                <br/>
                <br/>
                <br/>
                <DateField fullWidth label="Date" value={date} onChange={(newValue) => setDate(newValue)}format="MM-DD-YYYY"/>
                <br/>
                <br/>
                <TextField  value={specialist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpecialist(e.target.value)} fullWidth  label="Specialist" variant="standard" aria-label="Specialist"></TextField>
                <br/>
                <br/>
                <br/>
                <FormControl fullWidth>
                <InputLabel  id="demo-multiple-name-label">Code</InputLabel>
                <Select labelId="demo-multiple-name-label" id="demo-multiple-name" multiple value={diagnosisCodes} onChange={handleChange} input={<OutlinedInput label="Code" />} MenuProps={MenuProps}>
                    {codes.map((code) => (
                    <MenuItem 
                    key={code}
                     value={code}
                    style={getStyles(code, codes, theme)}
                    >
                    {code}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                <br/>
                <br/>
                <TextField defaultValue={0} select value={healthRating} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRating(e.target.value.toString())} fullWidth  label="Healthcheck rating" variant="standard" aria-label="HealthcheckRating">
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                </TextField>
                <br/>
                <br/>
                
            <Button onClick={() => setVisible(!visible)} variant="contained" color="error" size="small">CANCEL</Button>
            <Button type="submit" disableElevation style={ { float: "right", marginBottom: 2 } } variant="contained" color="success">ADD</Button>
            </div>
            </form>
            </LocalizationProvider>
        );
    } else if (select === "OccupationalHealthcare") {
        return(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={addnewEntry}>
            <div>
            <br/>
            <TextField value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} fullWidth  label="Description" variant="standard" aria-label="Description"></TextField>
            <br/>
            <br/>
            <br/>
            <DateField fullWidth label="Date" value={date} onChange={(newValue) => setDate(newValue)}format="MM-DD-YYYY"/>
            <br/>
            <br/>
            <TextField value={specialist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpecialist(e.target.value)} fullWidth  label="Specialist" variant="standard" aria-label="Specialist"></TextField>
            <br/>
            <br/>
            <br/>
            <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label">Code</InputLabel>
                <Select labelId="demo-multiple-name-label" id="demo-multiple-name" multiple value={diagnosisCodes} onChange={handleChange} input={<OutlinedInput label="Code" />} MenuProps={MenuProps}>
          {codes.map((code) => (
            <MenuItem
              key={code}
              value={code}
              style={getStyles(code, codes, theme)}
            >
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            <br/>
            <br/>
            <TextField value={employerName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployerName(e.target.value)} fullWidth  label="Employer name" variant="standard" aria-label="Employer"></TextField>
            <br/>
            <br/>
            <DateField fullWidth label="Start Date" value={startDate} onChange={(newValue) => setDate(newValue)}format="MM-DD-YYYY"/>
            <br/>
            <br/>
            <DateField fullWidth label="End Date" value={endDate} onChange={(newValue) => setDate(newValue)}format="MM-DD-YYYY"/>
            <br/>
            <br/>
            <Button onClick={() => setVisible(!visible)} variant="contained" color="error" size="small">CANCEL</Button>
            <Button type="submit" disableElevation style={ { float: "right", marginBottom: 2 } } variant="contained" color="success">ADD</Button>
            </div>
            </form>
            </LocalizationProvider>
        )
    } else if (select === "Hospital") {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={addnewEntry}>
            <div>
            <br/>
            <br/>
            <TextField value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} fullWidth  label="Description" variant="standard" aria-label="Description"></TextField>
            <br/>
            <br/>
            <br/>
            <DateField fullWidth label="Date" value={date} onChange={(newValue) => setDate(newValue)}format="MM-DD-YYYY"/>
            <br/>
            <br/>
            <TextField value={specialist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpecialist(e.target.value)} fullWidth  label="Specialist" variant="standard" aria-label="Specialist"></TextField>
            <br/>
            <br/>
            <br/>
            <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label">Code</InputLabel>
                <Select labelId="demo-multiple-name-label" id="demo-multiple-name" multiple value={diagnosisCodes} onChange={handleChange} input={<OutlinedInput label="Code" />} MenuProps={MenuProps}>
          {codes.map((code) => (
            <MenuItem
              key={code}
              value={code}
              style={getStyles(code, codes, theme)}
            >
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            <br/>
            <br/>
            <DateField fullWidth label="Discharge Date" value={dischargeDate} onChange={(newValue) => setDate(newValue)} format="MM-DD-YYYY"/>
            <br/>
            <br/>
            <TextField value={criteria} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCriteria(e.target.value)} fullWidth  label="Criteria" variant="standard" aria-label="Criteria"></TextField>
            <br/>
            <br/>
            <Button onClick={() => setVisible(!visible)} variant="contained" color="error" size="small">CANCEL</Button>
            <Button type="submit" disableElevation style={ { float: "right", marginBottom: 2 } } variant="contained" color="success">ADD</Button>
            </div>
            </form>
            </LocalizationProvider>
        )
    }
    else {
        return (<p>"loading..."</p>);
    }
};

export default EntryType;