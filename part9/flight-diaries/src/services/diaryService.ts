import diaries from '../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';


const getEntries = (): Array<DiaryEntry> => {
    return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility}) => ({
      id,
      date,
      weather,
      visibility,
    }));
  };

const addDiary = (entry: NewDiaryEntry): NewDiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    };

    diaries.push(newDiaryEntry);

    return newDiaryEntry;
};

const findById = (id: number):DiaryEntry | undefined => {
    const entry = diaries.find(diary => diary.id === id);
    return entry;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById
};