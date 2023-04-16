import { IRecipeItem } from "./recipeItem.interface";

export interface IRecipe {
    number: number;
    offset: number;
    results: IRecipeItem[];
    totalResults: number;
}