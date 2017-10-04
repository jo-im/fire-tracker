import Ember from 'ember';
import DS from 'ember-data';

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
      Ember.$.ajax({
        type: "GET",
        url: 'https://jollypod.com/incidents/_changes?since=now&feed=longpoll',
        dataType: 'json',
        success: (res) => {
          (res.results || []).forEach(callback);
          Ember.run.later(longpoll, 10000);
        },
        error: function() {
          Ember.run.later(longpoll, 10000);
        }
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
    return new Ember.RSVP.Promise(resolve => Ember.$.get("https://jollypod.com/incidents/_all_docs?include_docs=true", resolve));
  },

  findRecord: function(store, type, id){
    return new Promise((resolve) => {
      Ember.$.get(`https://jollypod.com/incidents/${id}`, (doc) => {
        resolve(doc);
      });
    });
  },

  queryRecord: function(store, type, query){
    return new Ember.RSVP.Promise((resolve) => {
      Ember.$.ajax({
        type: "POST",
        url: "https://jollypod.com/incidents/_find",
        data: JSON.stringify(query),
        success: resolve,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      });
    });
  }

});

