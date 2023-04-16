import { IIngredients } from "./ingredients.interface";

export interface IRecipeDetails {
    id: number;
    title: string;
    image: string;
    imageType: string;
    sourceName: string;
    sourceUrl: string;
    spoonacularSourceUrl: string;
    vegan: boolean;
    vegetarian: boolean;
    summary: string;
    extendedIngredients: IIngredients[];
}
