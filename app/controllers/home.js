import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later, cancel } from '@ember/runloop';

export default class HomeController extends Controller {
  @service session;
  @service store;

  @tracked products;

  @tracked currentSection;

  @tracked meals = [];

  serving;
  food;

  @action
  update(event) {
    this[event.target.id] = event.target.value;
  }

  @action
  changeSection(section) {
    this.currentSection = section;
  }

  @action
  mealSelected(event) {
    this.currentSection = this.meals.pushObject({
      name: event.target.innerText,
      foods: []
    });
    
  }

  @action
  closeLater(dropdown) {
    this.closeTimer = later(() => {
      this.closeTimer = null;
      dropdown.actions.close();
    }, 200);
  }

  @action
  async searchFood() {
    const response = await fetch(
      `https://us-en.openfoodfacts.org/api/v2/search?categories_tags_en=${this.food}&fields=product_name,energy_100g&json=true&page_size=100`
    );
    const foods = await response.json();
    foods.products.forEach((product) => {
      product.name = product.product_name;
      product.kcal = product.energy_100g;
      delete product.energy_100g;
      delete product.product_name;
      product.kcal = parseInt(product.kcal / 4.814);
    });
    this.products = foods.products;
  }

  @action
  addFood(product) {
    let serving = parseFloat(this.serving) / 100.0;
    product.kcal = serving * product.kcal;
    product.serving = this.serving;
    this.currentSection.foods.pushObject(product);
  }

  @action
  removeSection(meal) {
    this.meals.removeObject(meal);
  }
}
