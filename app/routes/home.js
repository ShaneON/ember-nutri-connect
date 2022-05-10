import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

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
    const dateToday = new Date()
      .toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('/', '');
    let foods = await this.store.query('food', {
      userId: user.id,
      dayOfYear: dateToday
    });
    return {
      user: user,
      foods: foods.toArray(),
    };
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    let { user } = model;
    let { foods } = model;
    controller.user = user;
    controller.foods = foods;
  }
}
