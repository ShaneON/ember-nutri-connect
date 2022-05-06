import RESTSerializer from '@ember-data/serializer/rest';
import Ember from 'ember';

export default class UserSerializer extends RESTSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = { users: payload };

    return super.normalizeResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    payload.users.id = payload.users._id;
    delete payload.users._id;
    return super.normalizeSingleResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    payload.users.forEach((user) => {
      user.id = user._id;
      delete user._id;
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
