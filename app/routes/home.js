import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    //this.session.requireAuthentication(transition, 'login');
  }

  model() {
  }

  // setupController(model, controller) {
  //   this._super(...arguments);
  //   controller.diary = model;
  // }
}
