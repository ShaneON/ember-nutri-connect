import Model, { attr, belongsTo } from '@ember-data/model';

export default class DiaryModel extends Model {
  @belongsTo('user') user;

  @attr('date') date;
  @attr() meals;
}
