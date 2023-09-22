import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const height = Number (req.query.height);
        const weight = Number (req.query.weight);
        if(height && !isNaN(height) && weight && !isNaN(weight)){
            res.send({
                weight: req.query.weight,
                height: req.query.height,
                bmi: calculateBmi(height, weight)
            });
        } else {
            throw new Error('malformatted paramters');
            
        }

    } catch( error: unknown) {
        res.send({ error: "malformatted parametrs"});
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type daily_exercises = any; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type target = any;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    try {

        if(!daily_exercises || !target ) {
            return res.status(400).send( { error: "parameters missing" });
        }

        if(!(daily_exercises instanceof Array)) {
            return res.status(400).send({ error: "malformatted parametes" });
        }
        
        if(daily_exercises.map(num => Number(num)).includes(NaN)) {
            return res.status(400).send({ error: "malformatted parametes" });
        } 

        if(isNaN(Number(target))) {
            return res.status(400).send({ error: "malformatted parameters"});
        }

        return res.send(calculateExercises(daily_exercises.map(num => Number(num)), Number(target)));

    } catch (error: unknown) {
       return res.send({ error: "malformatted parameters" });
    } 
});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});