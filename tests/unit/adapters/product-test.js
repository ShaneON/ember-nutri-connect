import { module, test } from 'qunit';
import { setupTest } from 'ember-nutri-connect/tests/helpers';

module('Unit | Adapter | product', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:product');
    assert.ok(adapter);
  });
});
