import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: function(model) {
    return model.get('name');
  },
  model(params){
    // debugger
    // return this.store.queryRecord('fire', {
    //   "selector": {
    //     "slug": {
    //       "$eq": params.slug
    //     }
    //   }
    // });
    return this.store.queryRecord('fire', {
      "keys": [params.slug]
    })
  }
});

