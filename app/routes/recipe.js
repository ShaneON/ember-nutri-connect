import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RecipeRoute extends Route {
  @service store;

  model() {
    return this.store.findAll('recipe');
  }

  setupController(controller, model) {
    controller.recipes = model;
  }
}
