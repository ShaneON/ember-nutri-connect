import Model, { attr, belongsTo } from '@ember-data/model';

export default class FoodModel extends Model {
  @attr('string') userId;
  @attr('String') name;
  @attr('String') meal;
  @attr('String') dayOfYear;
  @attr('number') kcal;
  @attr('number') protein;
  @attr('number') fat;
  @attr('number') carbs;
  @attr('number') serving;
  @attr('number') sodium;
  @attr('number') fiber;
}
