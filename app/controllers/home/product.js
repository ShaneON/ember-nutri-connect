import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeProductController extends Controller {
  @service router;

  @action
  closeModal() {
    this.router.transitionTo('home');
  }
}
