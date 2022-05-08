import Model, { attr, hasMany } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr('string') name;
  @attr('number') kcal;
  @attr('number') protein;
  @attr('number') fat;
  @attr('number') carbs;
  @attr('number') sodium;
  @attr('number') fiber;
}
