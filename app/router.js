import EmberRouter from '@ember/routing/router';
import config from 'ember-practice/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' });

  this.route('vegan', function () {});
  this.route('login');
});
