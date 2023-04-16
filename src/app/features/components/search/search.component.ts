import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IRecipe } from 'src/app/infrastructure/interfaces';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public searchForm: FormGroup;
  public recipes: IRecipe;
  private destroy$ = new Subject();
  private router = inject(Router);
  public names = ['alex', 'marti', 'malman'];
  public selectedNames = [];
  public favoriteRecipeList = {};

  constructor(private readonly formBuilder: FormBuilder, private readonly recipeService: RecipeService) { }

  redact(index: number) {
    this.selectedNames[index] = !this.selectedNames[index];
  }

  getSelected() {
    this.names
      .filter((_, i) => this.selectedNames[i])
      .forEach(item => console.log(item));
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
    this.favoriteRecipeList = this.recipeService.getRecipeListFromStorage();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  checked(event: any, recipeId: number) {
    this.favoriteRecipeList[recipeId] = event.checked;
    localStorage.setItem('recipeList', JSON.stringify(this.favoriteRecipeList));
  }

  searchRecipe() {
    this.recipeService.getRecipe(this.searchForm.get('search').value).pipe(
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      this.recipes = resp;
    })
  }

  recipeDetails(id: number) {
    this.router.navigate(['recipe-details', id]);
  }

  favoriteRecipes() {
    this.router.navigate(['favorite-recipes']);
  }
}
