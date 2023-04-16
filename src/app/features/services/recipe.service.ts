import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe, IRecipeDetails, IRecipeItem } from 'src/app/infrastructure/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  public getRecipe(recipe?: string): Observable<IRecipe> {
    const {serverUrl, apiKey} = environment;
    // TODO: move apiKey query param to interceptor (serverUrl also if possible)
    return this.http.get<IRecipe>(`${serverUrl}/recipes/complexSearch?query=${recipe}`);
  }

  public getRecipeDetails(id: number): Observable<IRecipeDetails> {
    const {serverUrl, apiKey} = environment;
    return this.http.get<IRecipeDetails>(`${serverUrl}/recipes/${id}/information`);
  }

  public getRecipeBulk(ids: string): Observable<IRecipeItem[]> {
    const {serverUrl, apiKey} = environment;
    return this.http.get<IRecipeItem[]>(`${serverUrl}/recipes/informationBulk?ids=${ids}`);
  }

  public getRecipeListFromStorage() {
    const listFromStorage = localStorage.getItem('recipeList');
    if (listFromStorage) {
      return JSON.parse(listFromStorage);
    }
  }
}
