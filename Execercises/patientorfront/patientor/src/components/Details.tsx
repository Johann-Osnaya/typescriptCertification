import { Entry } from "../types"
import { Work, MedicalServices, Favorite, LocalHospital } from "@mui/icons-material"
const Details = ({data} : {data: Entry}) => {

    const style = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
        switch (data.type) {
            case "OccupationalHealthcare":
                return (        
                <div style={style}>
                    {data.date} {<Work />}  <i><b>{data.employerName}</b></i><br/>
                    <i>{data.description}</i> <br/>
                    diagnose by {data.specialist}
                </div>)
            case "HealthCheck":
            const color = data.healthCheckRating === 0 ? "green" : data.healthCheckRating === 1 ? "yellow" : data.healthCheckRating === 2 ? "orange" : "red"
                return (
                    <div style={style}>
                    {data.date} {<MedicalServices />} <br/>
                    <i>{data.description}</i> <br/>
                    {<Favorite style={ {color}} />} <br/>
                    diagnose by {data.specialist}

                    </div>
                )
            case "Hospital": 
            return (
                <div style={style}>
                    {data.date} {<LocalHospital />} <br/>
                    <i>{data.description}</i> <br/>
                    <b>Discharge:</b> {data.discharge.date} <br/>
                    <i>{data.discharge.criteria}</i>
                </div>
            )
            default: 
            return <div>ME</div>
        }
}

export default Details