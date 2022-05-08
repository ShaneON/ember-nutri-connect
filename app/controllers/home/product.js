import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { inject as controller } from '@ember/controller';

const SERVING_DEFAULT = 100;

export default class HomeProductController extends Controller {
  @service router;
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

    this.home.currentSection.foods.pushObject(food);
    this.router.transitionTo('home');
  }

  @action
  closeModal() {
    this.router.transitionTo('home');
  }
}
