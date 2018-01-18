/* global EventSource */

import Ember from 'ember';
import ENV from '../config/environment';
import fetch from 'fetch';

export default Ember.Service.extend(Ember.Evented, {
  fastboot: Ember.inject.service(),
  init(){
    this._super(...arguments);
    this._listen();
  },
  _listen(){
    if(this.get('fastboot.isFastBoot') || this.get('isDestroying') || this.get('isDestroyed')) return;
    fetch(`${ENV.couchdb.endpoint}/fires/_changes?since=now&feed=longpoll`)
      .then(resp => resp.json())
      .then(json => {
        json.results.forEach(result => this.trigger('change', result));
      })
      .catch(() => { 
        // probably got a 504 so do nothing.
      })
      .then(() => this._listen());
  }
});

