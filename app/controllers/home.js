import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

const MEALSLIST = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Brunch', 'Supper'];

export default class HomeController extends Controller {
  @service router;
  @service session;
  @service store;

  @tracked currentSection;
  @tracked meals = [];
  @tracked kcalTotal = 0;
  @tracked proteinTotal = 0;
  @tracked carbsTotal = 0;
  @tracked fatTotal = 0;
  @tracked sodiumTotal = 0;
  @tracked fiberTotal = 0;
  @tracked isShowingModal = false;

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
