import DS from 'ember-data';

export default DS.Serializer.extend({
  normalizeResponse: function(store, primaryModelClass, payload, id, requestType){
    if (requestType === 'queryRecord') {
      return this.normalize(primaryModelClass, payload);
    }
  },
  normalize(modelClass, resourceHash){
    return {
      data: {
        id: resourceHash._id,
        type: modelClass.modelName,
        attributes: resourceHash
      }
    };
  }
});
