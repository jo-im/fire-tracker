import Ember from 'ember';
import DS from 'ember-data';
import fetch from 'fetch';
import ENV from '../config/environment';
import { NotFoundError } from '../lib/fetch-errors';

const {
  run: {
    bind
  }
} = Ember;

export default DS.Adapter.extend({

  _onInit : Ember.on('init', function()  {
    this._startChangesToStoreListener();
  }),

  _startChangesToStoreListener: function () {
    var callback = bind(this, 'onChange');
    let longpoll = () => {

    fetch(`${ENV.couchdb.endpoint}/fires/_changes?since=now&feed=longpoll`)
      .then(function(response) {
        // ((response.json() || {}).results || []).forEach(callback);
        return response.json();
      })
      .catch(function() {
        Ember.run.later(longpoll, 10000);
      })
      .then(function(json) {
        ((json || {}).results || []).forEach(callback);
      });
    }
    longpoll();
  },

  onChange: function (change) {
    var store = this.store;
    try {
      store.modelFor('fire');
    } catch (e) {
      // The record refers to a model which this version of the application
      // does not have.
      return;
    }

    var recordInStore = store.peekRecord('fire', change.id);

    if (!recordInStore.get('isLoaded') || recordInStore.get('hasDirtyAttributes') ) {
      // The record either hasn't loaded yet or has unpersisted local changes.
      // In either case, we don't want to refresh it in the store
      // (and for some substates, attempting to do so will result in an error).
      return;
    }

    // if (change.deleted) {
    //   store.unloadRecord(recordInStore);
    // } else {
    //   recordInStore.reload();
    // }
    recordInStore.set('isOutdated', true);
  },

  findAll: function(){
    return fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/full?reduce=false&descending=true`).then((resp) => {
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
    return fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/full?reduce=false`, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(resp => resp.json());
  },

  findRecord: function(store, type, id){
    return fetch(`${ENV.couchdb.endpoint}/fires/${id}`)
      .then(resp => resp.json())
      .catch(err => new NotFoundError(err));
  },

  queryRecord: function(store, type, query){
    return fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/full?reduce=false&limit=1`, {
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
        return Ember.RSVP.Promise.reject(new NotFoundError('hey'));
      }
    });
  }

});

