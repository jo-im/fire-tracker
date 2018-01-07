/* global EventSource */

import Ember from 'ember';
import ENV from '../config/environment';
import fetch from 'fetch';

export default Ember.Service.extend(Ember.Evented, {
  init(){
    this._super(...arguments);
    this._listen();
  },
  _listen(){
    fetch(`${ENV.couchdb.endpoint}/fires/_changes?since=now&feed=longpoll`)
      .then(resp => resp.json())
      .then(json => {
        json.results.forEach(result => this.trigger('change', result));
        this._listen();
      });
  }
});
