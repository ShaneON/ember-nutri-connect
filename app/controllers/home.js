import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

const SERVING_DEFAULT = 100;

export default class HomeController extends Controller {
  @service session;
  @service store;

  @tracked products;
  @tracked currentSection;
  @tracked meals = [];
  @tracked kcalTotal = 0;

  serving = SERVING_DEFAULT;
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
    const currentSection = this.meals.pushObject({
      name: event.target.innerText,
      foods: [],
    });

    this.currentSection = currentSection;
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
    const kcalByServing = serving * product.kcal;

    product.kcal = kcalByServing;
    product.serving = this.serving;

    this.kcalTotal += kcalByServing;
    this.currentSection.foods.pushObject(product);
    this.serving = SERVING_DEFAULT;
  }

  @action
  removeSection(meal) {
    const mealKcals = meal.foods.reduce((previous, current) => {
      return previous + current.kcal;
    }, 0);
    this.kcalTotal -= mealKcals;
    const index = this.meals.indexOf(meal);
    this.meals.removeObject(meal);
    if (meal === this.currentSection && this.meals.length) 
      this.currentSection = this.meals[index - 1];
  }

  @action
  removeFood(food, meal) {
    this.kcalTotal -= food.kcal;
    meal.foods.removeObject(food);
  }
}
