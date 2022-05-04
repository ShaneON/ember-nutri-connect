import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ListVeganController extends Controller {
  @service store;

  name;
  cost;

  // @filter('items', function (item, index, array) {
  //   return item.type === 'omni';
  // })
  // regularFoods;

  // @filter('items', function (item, index, array) {
  //   return item.type === 'vegan';
  // })
  // veganFoods;

  @action
  addItem() {
    let food = this.store.createRecord('food', {
      name: this.name,
      cost: this.cost,
    });

    food.save();
  }

  @action
  nameChanged(event) {
    this.name = event.target.value;
  }

  @action
  attributeChanged(event) {
    this.cost = event.target.value;
  }

  @action
  deleteItem(item) {
    item.destroyRecord();
  }
}
