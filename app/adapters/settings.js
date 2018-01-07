import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';
import shoebox from '../mixins/shoebox';

export default DS.Adapter.extend(shoebox, {

  findAll: function(){
    return this.fetch(`${ENV.couchdb.endpoint}/settings/_all_docs/?include_docs=true&reduce=false&descending=true`).then(resp => {
      return resp.json();
    });
  },

  query: function(store, type, query){
    query = query || {};
    query.descending = query.descending || false;
    query.limit      = query.limit      || 100;
    return this.fetch(`${ENV.couchdb.endpoint}/settings/_all_docs/?include_docs=true&reduce=false&descending=${query.descending}&limit=${query.limit}`)
      .then(resp => {
        if(resp.status === 200) {
          return resp.json();
        } else {
          return Ember.RSVP.Promise.resolve({
            rows: [
              {
                featuredFires: []
              }
            ]
          });
        }
      });
  },

  findRecord: function(store, type, id){
    return this.fetch(`${ENV.couchdb.endpoint}/settings/${id}`).then(resp => resp.json());
  },

  queryRecord: function(store, type, query){
    return this.fetch(`${ENV.couchdb.endpoint}/settings/_find/?include_docs=true`, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(resp => { 
      return resp.json(); 
    });
  }

});

