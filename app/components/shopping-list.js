import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ShoppingListComponent extends Component {
  @service recipe;

  @action
  addToRecipe(food) {
    this.recipe.addIngredient(food);
  }
}
