import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @service session;

  @tracked breakfast;
  @tracked lunch;
  @tracked dinner;
  @tracked products;

  breakfastList = ['Croissant', 'Muesli', 'Eggs and Tomatoes'];
  lunchList = ['Sandwich', 'Crisps', 'Beer'];
  dinnerList = ['Steak', 'Potato', 'Pasta and Tuna'];

  @action
  update(event) {
    this[event.target.id] = event.target.value;
  }

  @action
  async searchFood(mealType) {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/search?categories_tags_en=${this[mealType]}&fields=product_name,energy_100g&json=true&page_size=100`
    );
    const foods = await response.json();
    console.log(foods);
    this.products = foods.products;
  }
}
