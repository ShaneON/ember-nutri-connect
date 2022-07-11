import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { filterBy } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

const MEALLIST = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Brunch', 'Supper'];
const DATE_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

export default class HomeController extends Controller {

  dateToday = new Date().toLocaleDateString('en-GB', DATE_OPTIONS);

  @service router;
  @service session;
  @service store;

  @tracked foods;

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

  get totalKcal() {
    return this.foods.reduce((previous, current) => {
      return previous + current.get('kcal');
    }, 0);
  }

  get totalProtein() {
    return this.foods.reduce((previous, current) => {
      return previous + current.get('protein');
    }, 0);
  }

  get totalFat() {
    return this.foods.reduce((previous, current) => {
      return previous + current.get('fat');
    }, 0);
  }

  get totalCarbs() {
    return this.foods.reduce((previous, current) => {
      return previous + current.get('carbs');
    }, 0);
  }

  get totalSodium() {
    return this.foods.reduce((previous, current) => {
      return previous + current.get('sodium');
    }, 0);
  }

  get totalFiber() {
    return this.foods.reduce((previous, current) => {
      return previous + current.get('fiber');
    }, 0);
  }

  food;
  currentMeal;
  mealList = MEALLIST;
  @tracked isEditing = true;

  @action
  update(event) {
    this[event.target.id] = event.target.value;
  }

  @action
  mealSelected(dropdown, event) {
    let nextSnackNum = this.snack.length + 1;
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
  async removeFood(food, meal) {
    const foodToDelete = await this.store.peekRecord('food', food.id);
    foodToDelete.destroyRecord();
    this.foods.removeObject(food);
    this.foods = this.foods;
  }
}
