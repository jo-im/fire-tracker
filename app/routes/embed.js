import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: function(model) {
    return model.get('name');
  },
  model(params){
    return this.store.queryRecord('fire', {
      "selector": {
        "slug": {
          "$eq": params.slug
        }
      }
    });
  }
});

