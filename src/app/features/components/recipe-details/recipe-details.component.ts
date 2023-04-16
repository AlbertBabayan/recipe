import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IRecipeDetails } from 'src/app/infrastructure/interfaces';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {

  public recipeDetails: IRecipeDetails;
  public canViewIngredients = false;
  public imageUrl = "https://spoonacular.com/cdn/ingredients_100x100/";
  private destroy$ = new Subject();

  constructor(private readonly recipeService: RecipeService, private readonly activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.recipeService.getRecipeDetails(+this.activeRoute.snapshot.paramMap.get('id')).pipe(
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      this.recipeDetails = resp;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  showIngredients() {
    this.canViewIngredients = !this.canViewIngredients;
  }
}
