import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  namespace = 'api';

  @computed('session.data.authenticated.token', 'session.isAuthenticated')
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers['token'] = this.session.data.authenticated.token;
    }

    return headers;
  }
}
