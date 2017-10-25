import Ember from 'ember';
import fetch from 'fetch';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      settings: this.store.query('settings', {limit: 1, descending: true}).then((rows) => {
        return Ember.RSVP.Promise.resolve(rows.toArray().pop());
      }),
      archiveFires: this.store.query('fire', {limit: 11, descending: true})
    });
  }
});

