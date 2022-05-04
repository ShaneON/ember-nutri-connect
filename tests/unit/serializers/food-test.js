import { module, test } from 'qunit';
import { setupTest } from 'ember-practice/tests/helpers';

module('Unit | Serializer | food', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('food');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('food', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
