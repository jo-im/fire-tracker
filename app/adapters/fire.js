import Ember from 'ember';
import DS from 'ember-data';
import fetch from 'fetch';

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

    fetch('https://jollypod.com/incidents/_changes?since=now&feed=longpoll')
      .then(function(response) {
        ((response.json() || {}).results || []).forEach(callback);
      })
      .catch(function(err) {
        Ember.run.later(longpoll, 10000);
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

    if (!recordInStore.get('isLoaded') || recordInStore.get('hasDirtyAttributes')) {
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

  findAll: function(store, type){
    return fetch("https://jollypod.com/incidents/_all_docs?include_docs=true").then((resp) => resp.json());
  },

  findRecord: function(store, type, id){
    return fetch(`https://jollypod.com/incidents/${id}`).then((resp) => resp.json());
  },

  queryRecord: function(store, type, query){
    return fetch("https://jollypod.com/incidents/_find", {
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

