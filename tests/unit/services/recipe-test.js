import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | recipe', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:recipe');
    assert.ok(service);
  });

  test('addIngredient works', function (assert) {
    let service = this.owner.lookup('service:recipe');
    assert.equal(service.ingredients.length, 0, 'ingredient list is empty');
    service.addIngredient({});
    assert.equal(service.ingredients.length, 1, 'ingredient list has one item');
  });
});
