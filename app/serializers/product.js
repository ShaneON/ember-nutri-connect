import RESTSerializer from '@ember-data/serializer/rest';
import Ember from 'ember';

export default class ProductSerializer extends RESTSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = { products: payload.products };

    return super.normalizeResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    payload.products.forEach((product) => {
      product.id = product.code;
      product.name = product.product_name ? product.product_name : 0;
      product.kcal = product.energy_100g ? product.energy_100g : 0;
      product.protein = product.proteins_100g ? product.proteins_100g : 0;
      product.fat = product.fat_100g ? product.fat_100g : 0;
      // prettier-ignore
      product.carbs = product.carbohydrates_100g ? product.carbohydrates_100g : 0;
      product.sodium = product.sodium_100g ? product.sodium_100g : 0;
      product.fiber = product.fiber_100g ? product.fiber_100g : 0;

      delete product.energy_100g;
      delete product.product_name;
      delete product.proteins_100g;
      delete product.fat_100g;
      delete product.carbohydrates_100g;
      delete product.sodium_100g;
      delete product.fiber_100g;
      delete product.code;

      product.kcal = parseInt(product.kcal / 4.814);
    });

    return super.normalizeArrayResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  serializeIntoHash = function (hash, type, record, options) {
    Ember.assign(hash, this.serialize(record, options));
  };
}
