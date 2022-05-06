import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;

  host = 'http://localhost:3000';
  namespace = 'api';

  @computed('session.data.authenticated.token', 'session.isAuthenticated')
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers['auth-token'] = this.session.data.authenticated.token;
    }

    return headers;
  }
}
