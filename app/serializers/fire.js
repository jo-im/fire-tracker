import DS from 'ember-data';

export default DS.Serializer.extend({
  normalizeResponse: function(store, primaryModelClass, payload, id, requestType){
    if (requestType === 'findRecord') {
      return this.normalize(primaryModelClass, payload);
    }
    if (requestType === 'queryRecord') {
      return this.normalize(primaryModelClass, payload);
    }
    if (payload.results) {
      return {
        data: (payload.results[0] || {rows: []}).rows.map(r => {
          return {id: r.id, type: 'fire', attributes: r.value};
        })
      }
    }
    return {
      data: payload.rows.map((r) => {
        // return this.normalize(primaryModelClass, r.doc);
        return {id: r.id, type: 'fire', attributes: r.doc};
      })
    };
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
