import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Archive',
  model(){
    // return this.store.findAll('sparse-fire');
    return this.get('store').query('sparse-fire', {queries: [{descending: true}]});
  },
  activate() {
    this._super();
    window.scrollTo(0,0);
  }
});
