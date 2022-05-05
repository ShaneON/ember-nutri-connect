import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    //this.session.requireAuthentication(transition, 'login');
  }

  model() {
    return this.store.createRecord('diary', {
      date: Date.now()
    });
  }

  setupController(model, controller) {
    this._super(...arguments);
    controller.diary = model;
  }
}
