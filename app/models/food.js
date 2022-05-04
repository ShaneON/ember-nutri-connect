import Model, { attr, hasMany } from '@ember-data/model';

export default class FoodModel extends Model {
  @hasMany('recipe') recipes;

  @attr('string') name;
  @attr('number') cost;
}
