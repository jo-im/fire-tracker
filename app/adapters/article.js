import DS from 'ember-data';
import fetch from 'fetch';
import ENV from '../config/environment';
import Ember from 'ember';
import { NotFoundError } from '../lib/fetch-errors';

export default DS.Adapter.extend({
  queryRecord: function(store, type, query){
    return fetch(`${ENV.couchdb.endpoint}/articles/_find`, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        let doc = json.docs[0];
        if(!doc) return Ember.RSVP.Promise.reject(new NotFoundError('Article not found.'));
        return doc;
      });
  }
});
