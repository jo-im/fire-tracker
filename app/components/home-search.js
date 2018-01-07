import Ember from 'ember';
import FireSearch from './fire-search';
import fetch from 'fetch';
import sortBy from 'npm:lodash.sortby';
import SearchIndex from '../lib/search-index';
import template from '../templates/components/fire-search';
import ENV from '../config/environment';

function getDistance(lat1, lon1, lat2, lon2) {
  // returns distance in miles
  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}

export default FireSearch.extend({
  store: Ember.inject.service(),
  classNames: ['home-search'],
  layout: Ember.computed(function() {
    return template;
  }),
  searchIndex: Ember.computed('searchData', function(){
    let searchData = this.get('searchData') || [];
    return new SearchIndex(searchData);
  }),
  onQuery: Ember.observer('query', function() {
    // rate-limit the user input
    this.set('hasNoResults', false);
    Ember.run.debounce(this, this.getResults, 500);
  }),
  getResults(){
    var query = this.get('query');
    if(!query || !query.length){
      this.set('hasNoResults', false);
      this.set('results', []);
      return;
    }
    // first try a full text search
    Ember.RSVP.Promise.resolve(this.get('searchIndex').search(query))
      .then((results) => {
        if(results.length){
          // doing this so that the distance attributes we
          // add later do not persist on the model object
          let oresults = results.map(r => new Ember.Object({
            slug: r.get('slug'),
            name: r.get('name'),
            countyName: r.get('countyName')
          })).slice(0,3);
          this.set('results', oresults);
        } else {
          return Ember.RSVP.Promise.reject();
        }
      })
      .catch(() => {
        // text search returned nothing... let's try geocoding
        return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${ENV.mapbox.accessToken}`)
          .then((resp) => {
            return resp.json();
          })
          .then((json) => {
            // get the first 
            let feature = (json.features || []).filter((f) => {
              // result that is in california
              return f.context.filter(c => c.short_code == 'US-CA')[0];
            }).filter(c => c.relevance == 1)[0];
            if(feature){
              // bingo
              return Ember.RSVP.Promise.resolve(feature);
            } else {
              return Ember.RSVP.Promise.reject();
            }
          })
          .then((feature) => {
            // sort results by distance
            let sorted = sortBy(this.get('searchData'), function(result){
              let distance = getDistance(result.get('lat'), result.get('long'), feature.center[1], feature.center[0]);
              // append distance value to individual results
              result.set('distance', Math.round(distance));
              result.set('relativeTo', feature.text);
              return distance;
            }).slice(0,3);
            this.set('results', sorted);
          })
          .catch(() => {
            this.set('hasNoResults', true);
            this.set('results', []);
          });
      });
  },
  actions: {
    onKeyUp(){},
    focus(){
      let query = this.get('query');
      if(this.getResults && query && query.length){
        this.getResults();
      }
      this.set('isFocused', true);
    },
    unfocus(){
      let results = this.get('results');
      if(results && results.length) {
        this.set('results', []);
      };
      this.set('isFocused', false);
    }
  }
});

