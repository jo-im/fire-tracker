import Ember from 'ember';

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),
  changes: Ember.inject.service(),
  progress: Ember.inject.service(),
  titleToken: function(model) {
    return model.fire.get('name');
  },
  model(params){
    let progress = this.get('progress');
    progress.start();
    return this.store.findRecord('settings', 'global').then(settings => {
      progress.inc(0.5);
      return settings;
    }).then(settings => {
      return Ember.RSVP.hash({
        settings: settings,
        fire: this.store.queryRecord('fire', {
          "keys": [params.slug]
        }).catch(err => {
          err.payload = {
            params,
            settings
          };
          return Ember.RSVP.Promise.reject(err, params, settings);
        }).then(fire => {
          progress.inc(0.5);
          return fire;
        })
      });
    });
  },
  afterModel(model){
    this.get('progress').done();
    // in the case that an alias is used to redirect from one fire to another.
    // weird, i know.
    let alias = (model.settings.get('aliases') || []).filter(a => a.from === model.fire.get('slug')).shift();
    if(alias) return this.transitionTo('fire', alias.to);
    this.set('onRemoteChange', Ember.run.bind(this, (change) => {
      if(change.id == model.fire.get('_id')){
        model.fire.set('isOutdated', true);
      }
    }));
    this.get('changes').on('change', this.get('onRemoteChange'));
  },
  actions: {
    error(error, params, settings) {
      if(error.payload){
        // in the case that we failed to find a fire, we should try to
        // see if the given slug is an alias for a fire
        let settings = error.payload.settings || {};
        let params   = error.payload.params || {};
        let alias = settings.getWithDefault('aliases', []).filter(a => a.from === params.slug).shift();
        if(alias) return this.transitionTo('fire', alias.to);
      }
      return true;
    },
    willTransition(){
      this.get('changes').off('change', this.get('onRemoteChange'));
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

