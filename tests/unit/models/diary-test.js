import { module, test } from 'qunit';
import { setupTest } from 'ember-practice/tests/helpers';

module('Unit | Model | diary', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('diary', {});
    assert.ok(model);
  });
});
