import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { inject as controller } from '@ember/controller';
import { tracked } from '@glimmer/tracking';

const SERVING_DEFAULT = 100;

export default class HomeProductController extends Controller {
  @service router;
  @service store;
  @controller home;

  defaultServing = SERVING_DEFAULT;
  @tracked products;

  @action
  update(food, event) {
    if (food.serving) food.kcal = parseInt(food.kcal / (food.serving / 100));

    this[event.target.id] = event.target.value;
    let serving = parseFloat(this[event.target.id]) / 100.0;

    if (serving > 0) food.kcal = parseInt(food.kcal * serving);

    food.serving = serving * 100;
  }

  @action
  async addFood(food) {
    let servingTimes;
    if (food.serving) servingTimes = parseFloat(food.serving) / 100.0;
    else servingTimes = parseFloat(this.defaultServing) / 100.0;

    food.protein = servingTimes * food.protein;
    food.fat = servingTimes * food.fat;
    food.carbs = servingTimes * food.carbs;
    food.sodium = servingTimes * food.sodium;
    food.fiber = servingTimes * food.fiber;

    food.serving = servingTimes * 100;

    const dateToday = new Date()
      .toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('/', '');

    let saveFood = this.store.createRecord('food', {
      userId: this.user.id,
      name: food.name,
      kcal: food.kcal,
      protein: food.protein,
      fat: food.fat,
      carbs: food.carbs,
      sodium: food.sodium,
      fiber: food.fiber,
      serving: food.serving,
      meal: this.home.currentMeal,
      dayOfYear: dateToday,
    });

    saveFood = await saveFood.save();

    this.foods.pushObject(saveFood);
    this.router.transitionTo('home');
  }

  @action
  closeModal() {
    this.router.transitionTo('home');
  }
}
