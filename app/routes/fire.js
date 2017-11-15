import Ember from 'ember';

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  titleToken: function(model) {
    return model.get('name');
  },
  model(params){
    return this.store.queryRecord('fire', {
      "keys": [params.slug]
    });
  },
  activate() {
    if(!this.get('isFastBoot')){
      window.scrollTo(0,0);
    }
  }
});

