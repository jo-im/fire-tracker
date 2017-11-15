import DS from 'ember-data';

export default DS.Serializer.extend({
  normalizeResponse: function(store, primaryModelClass, payload, id, requestType){
    if (requestType === 'findRecord') {
      return this.normalize(primaryModelClass, payload)
    }
    if (requestType === 'queryRecord') {
      return this.normalize(primaryModelClass, (payload.docs || payload.rows)[0].value);
    }
    return {
      data: (((payload.results || [])[0] || payload).rows || []).map(r => {
        let row = r.key.concat(r.value);
        return {id: r.id, type: 'fire', attributes: {
          startedAt: row[0],
          slug: row[1],
          _id: row[2],
          name: row[3],
          locationDescription: row[4],
          lat: row[5],
          long: row[6],
          acres: row[7],
          contained: row[8],
          county: row[9],
          thumbnailId: row[10]
        }};
      })
    }
  },
  normalize(modelClass, resourceHash){
    return {
      data: {
        id: resourceHash._id,
        type: 'fire',
        attributes: resourceHash
      }
    };
  }
});
