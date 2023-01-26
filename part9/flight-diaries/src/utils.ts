import { NewDiaryEntry, Weather } from "./types";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    const newEntry: NewDiaryEntry = {

    };

    return newEntry;
};

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }

    return comment;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Weather).includes(param);
};
export default { toNewDiaryEntry };