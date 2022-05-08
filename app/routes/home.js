import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    let user = await this.store.findRecord(
      'user',
      this.session.data.authenticated.id
    );
    return {
      user: user,
      diary: []
    };
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    let { user } = model;
    let { diary } = model;
    controller.user = user;
    controller.diary = diary;
  }
}
