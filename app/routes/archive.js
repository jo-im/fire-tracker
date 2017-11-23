import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Archive',
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  model(){
    return this.get('store').query('sparse-fire', {queries: [{descending: true}]});
  },
  activate() {
    this._super();
    if(!this.get('isFastBoot')){
      window.scrollTo(0,0);
    }
  }
});
