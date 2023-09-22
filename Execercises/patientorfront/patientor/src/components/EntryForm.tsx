import { Button, FormControl, Input } from "@mui/material"
import { newEntry } from "../types"
import { useState } from "react"

const EntryForm = () => {

    const [visible, setVisible] = useState<boolean>(false)
    


    return (
        <div>
        <Button onClick={() => setVisible(!visible)} variant="contained">Add Entry</Button>
        {visible && <FormControl>
            <Input aria-label="Description"></Input>
        </FormControl>}
        </div>

    )
}

export default EntryForm