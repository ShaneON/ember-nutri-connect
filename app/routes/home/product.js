import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeProductRoute extends Route {
  @service store;

  model(params) {
    return this.store
      .query('product', {
        id: params.id,
      })
      .then((data) => {
        return data.toArray();
      });
  }

  setupController(controller, model) {
    controller.products = model;
    let { user } = this.modelFor('home');
    let { foods } = this.modelFor('home');
    controller.user = user;
    controller.foods = foods;
  }
}
