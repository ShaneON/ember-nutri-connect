import { module, test } from 'qunit';
import { setupTest } from 'ember-practice/tests/helpers';

module('Unit | Adapter | food', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:food');
    assert.ok(adapter);
  });
});
