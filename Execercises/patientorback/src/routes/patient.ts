/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});


router.get('/:id', (req, res) => {
    res.send(patientsService.findById(req.params.id))
})

router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientsService.findById(req.params.id)
        if(!patient){
            return res.status(400).send("No such patient registered")
        }
        return res.send(patientsService.addEntry(req.body, patient.id))
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong. ';
        if(error instanceof Error) {
            errorMessage += 'Error: ' + error.message
        }
        return res.status(400).send(errorMessage);
    }


})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong. ';
        if(error instanceof Error) {
            errorMessage += 'Error: ' + error.message
        }
        res.status(400).send(errorMessage);
    }
});

export default router;