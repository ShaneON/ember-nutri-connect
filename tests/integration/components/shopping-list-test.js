import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | shopping-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('foods', [
      {
        id: 1,
        name: 'jam',
        cost: 5.6,
        recipes: [],
      },
    ]);

    this.set('nameChanged', () => {});
    this.set('deleteItem', function (food) {
      assert.deepEqual(food, {
        id: 1,
        name: 'jam',
        cost: 5.6,
        recipes: [],
      });
    });
    this.set('addItem', () => {});
    this.set('attributeChanged', () => {});

    await render(hbs`<ShoppingList 
      @foods={{this.foods}}
      @nameChanged={{this.nameChanged}}
      @deleteItem={{this.deleteItem}}
      @addItem={{this.addItem}}
      @attributeChanged={{this.attributeChanged}}
      />`);

    assert.dom('[data-test-food-name]').hasText('jam');
    assert.dom('[data-test-food-cost]').hasText('$5.60');

    await click('[data-test-delete-item]');
  });
});
