import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class VeganFoodRoute extends Route {
  @service store;
}
