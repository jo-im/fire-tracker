import Ember from 'ember';
import fetch from 'fetch';
import ENV from '../config/environment';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      settings: this.store.findRecord('settings', 'global'),
      archiveFires: this.store.query('sparse-fire', {queries: [{limit: 11, descending: true}]} ),
      fireSeason: fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/fire-season?limit=20&reduce=true`)
        .then(resp => resp.json())
        .then(json => Ember.RSVP.Promise.resolve(((json.rows || []).pop() || {}).value))
    });
  }
});

