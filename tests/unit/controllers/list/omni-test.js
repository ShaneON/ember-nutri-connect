import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | list/omni', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:list/omni');
    assert.ok(controller);
  });
});
