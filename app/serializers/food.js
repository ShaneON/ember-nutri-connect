import RESTSerializer from '@ember-data/serializer/rest';
import Ember from 'ember';

export default class FoodSerializer extends RESTSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = { foods: payload };

    return super.normalizeResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    payload.foods.id = payload.foods._id;
    delete payload.foods._id;
    console.log(payload);
    return super.normalizeSingleResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    payload.foods.forEach((item) => {
      item.id = item._id;
      delete item._id;
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
