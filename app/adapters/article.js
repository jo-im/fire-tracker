import DS from 'ember-data';
import ENV from '../config/environment';
import Ember from 'ember';
import { NotFoundError } from '../lib/fetch-errors';
import shoebox from '../mixins/shoebox';

export default DS.Adapter.extend(shoebox, {
  queryRecord: function(store, type, query){
    return this.fetch(`${ENV.couchdb.endpoint}/articles/_find`, {
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
