import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.store.queryRecord('fire', {
      "selector": {
        "slug": {
          "$eq": params.slug
        }
      }
    });
  },
  activate() {
    this._super();
    window.scrollTo(0,0);
  }
});

