import { IMeasure } from "./measure.interface";

export interface IIngredients {
    aisle: string;
    amount: number;
    consistency: string;
    id: number;
    image: string;
    measures: IMeasure;
    meta: string[];
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    unit: string;
}