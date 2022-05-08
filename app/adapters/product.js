import RESTAdapter from '@ember-data/adapter/rest';

export default class ProductAdapter extends RESTAdapter {
  host = 'https://us-en.openfoodfacts.org';
  namespace = 'api/v2';

  urlForQuery(query) {
    return `${this.host}/${this.namespace}/search?categories_tags_en=${query.id}&fields=product_name,energy_100g,proteins_100g,carbohydrates_100g,fat_100g,fiber_100g,sodium_100g,code&json=true&page_size=24`;
  }
}