import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll('fire');
  },
  activate() {
    this._super();
    window.scrollTo(0,0);
  }
});
