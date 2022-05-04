import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service session;

  @tracked error;
  @tracked email;
  @tracked password;

  @action
  update(event) {
    this[event.target.id] = event.target.value;
  }

  @action
  async login(event) {
    event.preventDefault();
    try {
      await this.session.authenticate(
        'authenticator:token',
        this.email,
        this.password
      );
    } catch (error) {
      this.error = error;
    }
  }
}
