import { module, test } from 'qunit';
import { setupTest } from 'ember-nutri-connect/tests/helpers';

module('Unit | Model | food', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('food', {});
    assert.ok(model);
  });
});
