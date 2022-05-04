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
  @tracked serving;

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
      `https://us-en.openfoodfacts.org/api/v2/search?categories_tags_en=${this[mealType]}&fields=product_name,energy_100g&json=true&page_size=100`
    );
    const foods = await response.json();
    foods.products.forEach((product) => {
      product.name = product.product_name;
      product.kcal = product.energy_100g;
      delete product.energy_100g;
      delete product.product_name;
      product.kcal = parseInt(product.kcal / 4.814);
    })
    this.products = foods.products;
  }

  @action
  addFood(product) {
    const meal = `${this.currentSection}List`;
    let serving = parseFloat(this.serving) / 100.0;
    product.kcal = serving * product.kcal;
    product.serving = this.serving;
    this[meal].pushObject(product);
  }
}
