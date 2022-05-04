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

  currentSection;

  @tracked breakfastList = [];
  @tracked lunchList = [];
  @tracked dinnerList = [];

  @action
  update(event) {
    this[event.target.id] = event.target.value;
  }

  @action
  async searchFood(mealType) {
    this.currentSection = mealType;
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/search?categories_tags_en=${this[mealType]}&fields=product_name,energy_100g&json=true&page_size=100`
    );
    const foods = await response.json();
    this.products = foods.products;
  }

  @action
  addFood(product) {
    const meal = `${this.currentSection}List`;
    this[meal].pushObject(product.product_name);
  }
}
