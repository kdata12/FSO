import { Diagnose } from "../types";
import { data } from '../data/diagnoses';

const getAll = (): Diagnose[] => {
    return data;
};

export default {
    getAll,
};