interface Values {
    height: number,
    weight: number
}

export const parseArguments = (args: string[]): Values => {
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers');
        
    }
};

const calculateBmi = (height: number, weight: number): string => {
    height = height / 100;
    const bmi = weight / (height * height);

    if(bmi < 16) {
        return 'Underweight (Severe thinness)';
    } else if ( bmi >= 16 && bmi < 17) {
        return 'Underweight (Moderate thinness)';
    } else if (bmi >= 17 && bmi < 18.5) {
        return 'Underweight (Mild thinness)';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 29.9) {
        return 'Overweight (Pre-obese)';
    } else if (bmi >= 30 && bmi < 34.9) {
        return 'Obese (Class I)';
    } else if (bmi >= 35 && bmi < 39.9) {
        return 'Obese (Class II)';
    } else if (bmi >= 40) {
        return 'Obese (Class III)';
    }
    else {
        throw new Error('Parameters out of scale');
    }
};

/*
try {
    const {height, weight } = parseArguments(process.argv); 
    console.log(calculateBmi(height, weight));

} catch( error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}*/

export default calculateBmi;


