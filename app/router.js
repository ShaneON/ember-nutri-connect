import EmberRouter from '@ember/routing/router';
import config from 'ember-nutri-connect/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' }, function () {
    this.route('product', { path: 'foods/:id'});
  });
  this.route('login');
});
