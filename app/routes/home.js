import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    let user = await this.store.findRecord('user', this.session.data.authenticated.id);
    return {
      user: user
    };
  }

  setupController(controller, model) {
    console.log(model)
    this._super(...arguments);
    let { user } = model;
    controller.user = user;
  }
}
