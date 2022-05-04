import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RecipeService extends Service {
  @tracked ingredients = [];

  addIngredient(ingredient) {
    if (!this.ingredients.includes(ingredient)) {
      this.ingredients = [...this.ingredients, ingredient];
    }
  }
}
