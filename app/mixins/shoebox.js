// Use this mixin wherever you would normally use ember-fetch
// so that the response gets serialized in the fastboot shoebox,
// thus preventing redundant database requests on fastboot page load.

import Ember from 'ember';
import fetch from 'fetch';

const {
  Mixin,
  RSVP: {Promise},
  inject: {service}
} = Ember;

function generateFakeResponse(obj) {
  return Promise.resolve({
    status: obj.status,
    json: function() { return Promise.resolve(obj.json); }
  });
}

export default Mixin.create({
  fastboot: service(),
  shoebox:  service(),
  fetch(...args) {
    let requestToken = this.get('shoebox').tokenizeAjaxRequest(...args);
    if(this.get('fastboot.isFastBoot')) {
      return fetch(...arguments)
        .then(resp => {
          return resp.json()
            .then(json => {
              let serialized = {
                status: resp.status,
                json: json
              }
              this.get('shoebox').pushResponse(requestToken, serialized);
              return generateFakeResponse(serialized);
            });
        });
    }
    let cachedResponse = this.get('shoebox').popResponse(requestToken);
    if(cachedResponse) {
      return generateFakeResponse(cachedResponse);
    }
    return fetch(...arguments);
  }
});

