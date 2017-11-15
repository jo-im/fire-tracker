import Ember from 'ember';
import DS from 'ember-data';
import fetch from 'fetch';
import ENV from '../config/environment';

// Remember: If a request is fine but the model isn't loading properly
// chances are you need to fix the serializer.

export default DS.Adapter.extend({

  findAll: function(store){
    return fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/sparse?reduce=false&descending=true`)
      .then(resp => resp.json());
  },

  query: function(store, type, query){
    query = query || {};
    query.descending = query.descending || false;
    query.limit      = query.limit      || 100;
    query.reduce     = query.reduce     || false;
    return fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/sparse?reduce=false`, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(resp => resp.json());
  },

  findRecord: function(store, type, id){
    return Ember.RSVP.Promise.resolve();
  },

  queryRecord: function(store, type, query){
    return fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/sparse?reduce=false`, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(resp => resp.json());
  }

});

