import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @hasMany('diary') diaries;

  @attr('string') name;
  @attr('string') email;
  @attr('number') weight;
  @attr('number') kcalDaily;
}
