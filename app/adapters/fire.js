import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';
import { NotFoundError } from '../lib/fetch-errors';
import shoebox from '../mixins/shoebox';

/**
 * The adapter for querying fires.
 * @module FireAdapter
 * @extends DS.Adapter
 */

export default DS.Adapter.extend(shoebox, {

  findAll: function(){
    return this.fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/full?reduce=false&descending=true`).then((resp) => {
      return resp.json()
        .then((json) => {
          json.rows.forEach(r => r.doc = r.value);
          return Ember.RSVP.Promise.resolve(json);
        });
    });
  },

  query: function(store, type, query){
    query = query || {};
    query.descending = query.descending || false;
    query.limit      = query.limit      || 100;
    query.reduce     = query.reduce     || false;
    return this.fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/full?reduce=false`, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(resp => resp.json());
  },

  findRecord: function(store, type, id){
    return this.fetch(`${ENV.couchdb.endpoint}/fires/${id}`)
      .then(resp => resp.json())
      .catch(err => new NotFoundError(err));
  },

  queryRecord: function(store, type, query){
    return this.fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/full?reduce=false&limit=1`, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(resp => resp.json())
    .then(json => {
      let data = (json.rows || []);
      if(data.length){
        return Ember.RSVP.Promise.resolve(data[0].value);
      } else {
        return Ember.RSVP.Promise.reject(new NotFoundError());
      }
    });
  }

});

