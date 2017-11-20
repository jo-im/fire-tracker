import Ember from 'ember';

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  titleToken: function(model) {
    return model.fire.get('name');
  },
  model(params){
    return Ember.RSVP.hash({
      settings: this.store.findRecord('settings', 'global'),
      fire: this.store.queryRecord('fire', {
        "keys": [params.slug]
      })
    });
  },
  activate() {
    if(!this.get('isFastBoot')){
      window.scrollTo(0,0);
    }
  }
});

