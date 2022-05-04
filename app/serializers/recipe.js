import RESTSerializer from '@ember-data/serializer/rest';

export default class RecipeSerializer extends RESTSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.forEach((item) => {
      item.id = item._id;
      delete item._id;
    });
    payload = { recipes: payload };

    return super.normalizeResponse(
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
