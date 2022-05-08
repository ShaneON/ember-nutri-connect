import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

const SERVING_DEFAULT = 100;
const MEALSLIST = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Brunch', 'Supper'];

export default class HomeController extends Controller {
  @service router;
  @service session;
  @service store;

  @tracked products;
  @tracked currentSection;
  @tracked meals = [];
  @tracked kcalTotal = 0;
  @tracked proteinTotal = 0;
  @tracked carbsTotal = 0;
  @tracked fatTotal = 0;
  @tracked sodiumTotal = 0;
  @tracked fiberTotal = 0;
  @tracked isShowingModal = false;

  serving = SERVING_DEFAULT;
  mealList = MEALSLIST;
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
  mealSelected(dropdown, event) {
    const currentSection = this.meals.pushObject({
      name: event.target.innerText,
      foods: [],
    });

    this.currentSection = currentSection;
    dropdown.actions.close();
  }

  @action
  closeLater(dropdown) {
    this.closeTimer = later(() => {
      this.closeTimer = null;
      dropdown.actions.close();
    }, 200);
  }

  @action
  closeModal() {
    this.isShowingModal = false;
    this.products = null;
  }

  @action
  async searchFood() {
    let food = this.food.replace(' ', '-');
    this.router.transitionTo('home.product', food);

    // this.isShowingModal = true;
    // const response = await fetch(
    //   `https://us-en.openfoodfacts.org/api/v2/search?categories_tags_en=${this.food}&fields=product_name,energy_100g,proteins_100g,carbohydrates_100g,fat_100g,fiber_100g,sodium_100g&json=true&page_size=24`
    // );
    // const foods = await response.json();
    // foods.products.forEach((product) => {
    //   product.name = product.product_name ? product.product_name : 0;
    //   product.kcal = product.energy_100g ? product.energy_100g : 0;
    //   product.protein = product.proteins_100g ? product.proteins_100g : 0;
    //   product.fat = product.fat_100g ? product.fat_100g : 0;
    //   product.carbs = product.carbohydrates_100g
    //     ? product.carbohydrates_100g
    //     : 0;
    //   product.sodium = product.sodium_100g ? product.sodium_100g : 0;
    //   product.fiber = product.fiber_100g ? product.fiber_100g : 0;

    //   delete product.energy_100g;
    //   delete product.product_name;
    //   delete product.proteins_100g;
    //   delete product.fat_100g;
    //   delete product.carbohydrates_100g;
    //   delete product.sodium_100g;
    //   delete product.fiber_100g;

    //   product.kcal = parseInt(product.kcal / 4.814);
    // });
    // this.products = foods.products;
  }

  @action
  addFood(product) {
    this.isShowingModal = false;

    let serving = parseFloat(this.serving) / 100.0;
    const kcalByServing = serving * product.kcal;
    const proteinByServing = serving * product.protein;
    const fatByServing = serving * product.fat;
    const carbsByServing = serving * product.carbs;
    const sodiumByServing = serving * product.sodium;
    const fiberByServing = serving * product.fiber;

    product.kcal = kcalByServing;
    product.protein = proteinByServing;
    product.fat = fatByServing;
    product.carbs = carbsByServing;
    product.sodium = sodiumByServing;
    product.fiber = fiberByServing;
    product.serving = this.serving;

    this.kcalTotal += kcalByServing;
    this.proteinTotal += proteinByServing;
    this.fatTotal += fatByServing;
    this.carbsTotal += carbsByServing;
    this.sodiumTotal += sodiumByServing;
    this.fiberTotal += fiberByServing;
    this.currentSection.foods.pushObject(product);
    this.serving = SERVING_DEFAULT;

    this.products = null;

    this.meals = this.meals;
  }

  @action
  removeSection(meal) {
    const mealKcals = meal.foods.reduce((previous, current) => {
      return previous + current.kcal;
    }, 0);
    const mealProtein = meal.foods.reduce((previous, current) => {
      return previous + current.protein;
    }, 0);
    this.kcalTotal -= mealKcals;
    this.proteinTotal -= mealProtein;
    const index = this.meals.indexOf(meal);
    this.meals.removeObject(meal);
    if (meal === this.currentSection && this.meals.length)
      this.currentSection = this.meals[index - 1];
  }

  @action
  removeFood(food, meal) {
    this.kcalTotal -= food.kcal;
    this.proteinTotal -= food.protein;
    this.fatTotal -= food.fat;
    this.carbsTotal -= food.carbs;
    this.sodiumTotal -= food.sodium;
    this.fiberTotal -= food.fiber;
    meal.foods.removeObject(food);
  }
}
