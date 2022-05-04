import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | list/omni', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:list/omni');
    assert.ok(route);
  });
});
