import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ListController extends Controller {
  @service recipe;

  get cartCount() {
    return this.recipe.ingredients.length;
  }
}
