import Ember from 'ember';
import DS from 'ember-data';
import fetch from 'fetch';

export default DS.Adapter.extend({

  findAll: function(store){
    return fetch("https://jollypod.com/settings/_all_docs/?include_docs=true&reduce=false&descending=true").then((resp) => {
      return resp.json();
    });
  },

  query: function(store, type, query){
    query = query || {};
    query.descending = query.descending || false;
    query.limit      = query.limit      || 100;
    return fetch(`https://jollypod.com/settings/_all_docs/?include_docs=true&reduce=false&descending=${query.descending}&limit=${query.limit}`).then((resp) => {
      return resp.json();
    });
  },

  findRecord: function(store, type, id){
    return fetch(`https://jollypod.com/settings/${id}`).then(resp => resp.json());
  },

  queryRecord: function(store, type, query){
    return fetch("https://jollypod.com/settings/_find/?include_docs=true", {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then((resp) => { 
      return resp.json(); 
    });
  }

});

