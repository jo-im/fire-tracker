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
  },
  headTags(){
    let model       = this.modelFor(this.routeName);
    let fire        = model.fire;
    if(!fire) return [];
    return [
      {
        type: 'meta',
        tagId: 'description',
        attrs: {
          name: 'description',
          content: fire.get('pageDescription')
        }
      },
      {
        type: 'meta',
        tagId: 'og:description',
        attrs: {
          property: 'og:description',
          content: fire.get('socialDescription') || fire.get('computedDescription')
        }
      },
      {
        type: 'meta',
        tagId: 'twitter:description',
        attrs: {
          name: 'twitter:description',
          content: fire.get('socialDescription') || fire.get('computedDescription')
        }
      },
      {
        type: 'meta',
        tagId: 'keywords',
        attrs: {
          name: 'keywords',
          content: [
            fire.get('name'),
            fire.get('countyName'),
            'KPCC', 
            'Southern California Public Radio', 
            '89.3', 
            '89.3 KPCC', 
            'Fires', 
            'Wildfires', 
            'Fire Tracker', 
            'News'
          ].filter(x => x).join(', ')
        }
      }
    ].filter(m => m.attrs.content);
  }
});

