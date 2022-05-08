import Route from '@ember/routing/route';

export default class HomeProductRoute extends Route {

  model(params) {
    return params.id;
  }
}
