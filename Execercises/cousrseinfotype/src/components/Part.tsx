import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
        case 'basic':
            return (
                <>
                <h3>{part.name} {part.exerciseCount}</h3>
                {part.description}
                </>
            )
        case 'group':
            return(
                <>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    project exercises {part.groupProjectCount}
                </>
            )
        case 'background':
            return (
                <>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    {part.description}
                    <br/>
                    submit to {part.backgroundMaterial}
                </>
            )
        case 'special':
            return(
                <>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    {part.description}
                    required skills: {part.requirements.map(r => {r})}
                </>
            )
        default:
            return assertNever(part)
    }
};

const assertNever = (value: never): never => {
    throw new Error(
    `Unhandled discriminated union member:
    ${JSON.stringify(value)}`);
    
}

export default Part;