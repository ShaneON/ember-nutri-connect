import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { filter } from '@ember/object/computed';

export default class ListOmniController extends Controller {
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
    this.items.pushObject({
      name: this.name,
      cost: this.cost,
    });
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
    this.model.removeObject(item);
  }
}
