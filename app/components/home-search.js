import Ember from 'ember';
import FireSearch from './fire-search';
import fetch from 'fetch';
import sortBy from 'npm:lodash.sortby';
import searchico from 'npm:searchico';
import template from '../templates/components/fire-search';

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
  classNames: ['home-search'],
  layout: Ember.computed(function() {
    return template;
  }),
  getSearchData: Ember.on('didInsertElement', function() {
    return fetch("https://jollypod.com/incidents/_design/spatial/_view/search?limit=20&reduce=false&descending=true")
      .then((resp) => {
        return resp.json()
          .then((json) => {
            let results = json.rows.map(r => r.value);
            this.set('searchData', results.map(r => new Ember.Object(r)));
            this.set('searchIndex', searchico(results, {deep: false, hyper_indexing: false}));
          });
      });
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
    Ember.RSVP.Promise.resolve(this.get('searchIndex').find(query))
      .then((results) => {
        if(results.length){
          let oresults = results.map(r => new Ember.Object(r)).slice(0,3);
          this.set('results', oresults);
        } else {
          return Ember.RSVP.Promise.reject();
        }
      })
      .catch(() => {
        // text search returned nothing... let's try geocoding
        return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=pk.eyJ1Ijoia2JyaWdncyIsImEiOiJjajg2NHpxMmcwc2I4MzJwZGZyNTU2dTU2In0.sJblWZzx_-6PmOYVVjPfLQ`)
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
            let sorted = sortBy((this.get('searchData') || []), function(result){
              let coords   = result.get('location.coordinates') || {};
              let distance = getDistance(coords.lat, coords.long, feature.center[1], feature.center[0]);
              // append distance value to individual results
              result.set('distance', Math.round(distance));
              result.set('relativeTo', feature.text);
              return distance;
            }).slice(0,3);
            this.set('results', sorted);
          })
          .catch(() => {
            this.set('hasNoResults', true);
            this.set('results', [])
          });
      });
  }
});

