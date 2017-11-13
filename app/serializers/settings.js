import DS from 'ember-data';

export default DS.Serializer.extend({
  normalizeResponse: function(store, primaryModelClass, payload, id, requestType){
    if (requestType === 'findRecord') {
      return this.normalize(primaryModelClass, payload)
    }
    if (requestType === 'queryRecord') {
      return this.normalize(primaryModelClass, payload.docs[0]);
    }
    return {
      data: payload.rows.map((r) => {
        return {
          id: r.id, 
          type: 'settings', 
          attributes: r.doc,
          relationships: {
            featuredFires: {
              data: r.doc.featuredFires.map(id => { return {id: id, type: 'fire'}; })
            }
          }
        };
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
