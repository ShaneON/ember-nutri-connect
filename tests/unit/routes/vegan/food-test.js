import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | vegan/food', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:vegan/food');
    assert.ok(route);
  });
});
