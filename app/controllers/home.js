import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
import { filterBy } from '@ember/object/computed';

export default class HomeController extends Controller {
  @service router;
  @service session;
  @service store;

  @filterBy('foods', 'meal', 'Breakfast') breakfast;
  @filterBy('foods', 'meal', 'Brunch') brunch;
  @filterBy('foods', 'meal', 'Lunch') lunch;
  @filterBy('foods', 'meal', 'Dinner') dinner;
  @filterBy('foods', 'meal', 'Supper') supper;
  @filterBy('foods', 'meal', 'Snack 1') snack1;
  @filterBy('foods', 'meal', 'Snack 2') snack2;
  @filterBy('foods', 'meal', 'Snack 3') snack3;
  @filterBy('foods', 'meal', 'Snack 4') snack4;
  @filterBy('foods', 'meal', 'Snack 5') snack5;

  @tracked kcalTotal = 0;
  @tracked proteinTotal = 0;
  @tracked carbsTotal = 0;
  @tracked fatTotal = 0;
  @tracked sodiumTotal = 0;
  @tracked fiberTotal = 0;
  @tracked foods;
  
  food;
  currentMeal;

  @action
  update(event) {
    this[event.target.id] = event.target.value;
  }

  @action
  mealSelected(dropdown, event) {
    nextSnackNum = this.snack.length + 1;
    let meal = event.target.innerText;
    if (meal === 'Snack') {
      meal = `${meal} ${nextSnackNum}`;
    }
    this.currentMeal = meal;
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
  async searchFood(name) {
    this.currentMeal = name;
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
    const mealFat = meal.foods.reduce((previous, current) => {
      return previous + current.fat;
    }, 0);
    const mealSodium = meal.foods.reduce((previous, current) => {
      return previous + current.sodium;
    }, 0);
    const mealCarbs = meal.foods.reduce((previous, current) => {
      return previous + current.carbs;
    }, 0);
    const mealFiber = meal.foods.reduce((previous, current) => {
      return previous + current.fiber;
    }, 0);

    this.kcalTotal -= mealKcals;
    this.proteinTotal -= mealProtein;
    this.fatTotal -= mealFat;
    this.carbsTotal -= mealCarbs;
    this.fiberTotal -= mealFiber;
    this.sodiumTotal -= mealSodium;

    const index = this.diary.indexOf(meal);
    this.diary.removeObject(meal);
    if (meal === this.currentSection && this.diary.length)
      this.currentSection = this.diary[index - 1];
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
