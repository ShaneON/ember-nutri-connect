import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeProductRoute extends Route {
  @service store;

  model(params) {
    return this.store.query('product', {
      id: params.id
    }).then((data) => {
      return data.toArray();
    });
  }

  setupController(controller, model) {
    controller.foods = model;
    controller.user = this.modelFor('home');
  }
}
