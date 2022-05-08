import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

const SERVING_DEFAULT = 100;

export default class HomeProductController extends Controller {
  @service router;

  serving = SERVING_DEFAULT;

  @action
  update(event) {
    this[event.target.id] = event.target.value;
  }

  @action
  addFood(food) {
    this.user.diary.pushObject(food);
    this.router.transitionTo('home');
  }

  @action
  closeModal() {
    this.router.transitionTo('home');
  }
}
