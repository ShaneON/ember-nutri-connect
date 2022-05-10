import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { inject as controller } from '@ember/controller';

const SERVING_DEFAULT = 100;

export default class HomeProductController extends Controller {
  @service router;
  @service store;
  @controller home;

  serving = SERVING_DEFAULT;

  @action
  update(event) {
    this[event.target.id] = event.target.value;
  }

  @action
  addFood(food) {
    let serving = parseFloat(this.serving) / 100.0;
    food.kcal = serving * food.kcal;
    food.protein = serving * food.protein;
    food.fat = serving * food.fat;
    food.carbs = serving * food.carbs;
    food.sodium = serving * food.sodium;
    food.fiber = serving * food.fiber;

    food.serving = this.serving;

    this.home.kcalTotal += food.kcal;
    this.home.proteinTotal += food.protein;
    this.home.fatTotal += food.fat;
    this.home.carbsTotal += food.carbs;
    this.home.sodiumTotal += food.sodium;
    this.home.fiberTotal += food.fiber;
    this.serving = SERVING_DEFAULT;

    const dateToday = new Date()
      .toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('/', '');

    this.foods.pushObject({
      name: food.name,
      userId: this.user.id,
      kcal: food.kcal,
      protein: food.protein,
      fat: food.fat,
      carbs: food.carbs,
      sodium: food.sodium,
      fiber: food.fiber,
      serving: food.serving,
      meal: this.home.currentMeal,
      dayOfYear: dateToday
    });
    this.router.transitionTo('home');
  }

  @action
  closeModal() {
    this.router.transitionTo('home');
  }
}
