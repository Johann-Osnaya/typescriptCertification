interface TrainigStats  {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number

}

interface Props {
    daysData: number[],
    target: number
}


export const parseConsole = (args: string[]): Props => {
    if(process.argv.length < 3) throw new Error('At least 2 arguments must be passed');

    const array: number[] = args.slice(3).map(num => Number(num));
    const target = Number(...args.slice(2, 3));

    if(!array.includes(NaN) && !isNaN(target))
    {
        return {
            daysData: array,
            target
        };
    } else {
        throw new Error('Argument types where not numbers');
    }

    
};

const calculateExercises = (args: number[], target: number): TrainigStats  => {
    const period: number = args.length;
    const trainingDays: number[] = args.filter(a => a > 0);
    const average: number = trainingDays.reduce((a , b) => a + b , 0 ) / args.length;
    let rating = 1;
    let description = '';
    const success = average  >= target ? true : false;
    if(  Math.round(average) === target ) {
        rating = 2; 
        description = 'Awesome, keep the effort';
    } else if ( average < target) {
        rating = 1;
        description = 'Keep triying, buddy';
    } else if (average > target ) {
        rating = 3;
        description = 'You are a beast!';
    }

    return {
        periodLength: period,
        trainingDays: trainingDays.length,
        success,
        rating,
        ratingDescription: description,
        target,
        average
    };
};

/*
try {
    const {daysData, target } = parseConsole(process.argv); 
    console.log(calculateExercises(daysData, target));

} catch( error: unknown) {
    let errorMessage = 'Something bad happened. ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}*/

export default calculateExercises;




