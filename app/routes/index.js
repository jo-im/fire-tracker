import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      settings: this.store.query('settings', {limit: 1, descending: true}).then((rows) => {
        return Ember.RSVP.Promise.resolve(rows.toArray().pop());
      }),
      // archiveFires: this.store.query('fire', {queries: [{limit: 11, descending: true}]} )
      archiveFires: this.store.query('sparse-fire', {queries: [{limit: 11, descending: true}]} )
    });
  }
});

