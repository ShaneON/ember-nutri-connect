import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @hasMany('food') foods;

  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') email;
  @attr('number') weight;
  @attr('number') kcalDaily;
}
