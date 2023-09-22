import diaries from '../data/entries';
import {
    DiaryEntry,
    NonSensitiveEntries,
    NewDiaryEntry
} from '../types';



const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const addDiary = ( entry: NewDiaryEntry): DiaryEntry => {
        const newDiaryEntry = {
            id: Math.max(...diaries.map(d => d.id)) + 1,
            ...entry
        };

        diaries.push(newDiaryEntry);
        return newDiaryEntry;
    };

const getNonSensitiveEntries = (): NonSensitiveEntries[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({ 
        id,
        date,
        weather,
        visibility
    }));
};


const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
};



export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById
};