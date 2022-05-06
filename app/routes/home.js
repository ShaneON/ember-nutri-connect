import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model() {
    return {
      user: this.store.findRecord('user', this.session.data.authenticated.id)
    }
  }

  setupController(controller, model) {
    console.log(model)
    this._super(...arguments);
    let { user } = model;
    controller.user = user;
  }
}
