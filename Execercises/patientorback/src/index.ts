import express from 'express';
import diagnoseRouter from './routes/diagnosis';
import patientsRouter from './routes/patient';
const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
