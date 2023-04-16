import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IRecipeItem } from 'src/app/infrastructure/interfaces';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-favorite-recipes',
  templateUrl: './favorite-recipes.component.html',
  styleUrls: ['./favorite-recipes.component.scss']
})
export class FavoriteRecipesComponent implements OnInit, OnDestroy {

  public favoriteRecipeList: IRecipeItem[];
  public favoriteRecipeIds: Record<string, boolean>;
  private destroy$ = new Subject();

  constructor(private readonly recipeService: RecipeService, private readonly router: Router) { }

  ngOnInit(): void {
    this.favoriteRecipeIds = this.recipeService.getRecipeListFromStorage();
    const ids = Object.keys(this.favoriteRecipeIds).join();
    this.recipeService.getRecipeBulk(ids).pipe(
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      this.favoriteRecipeList = resp;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  recipeDetails(id: number) {
    this.router.navigate(['recipe-details', id]);
  }
}
