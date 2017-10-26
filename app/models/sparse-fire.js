// Use this for when you only need the minimal amount of data for a fire.
// For example, the archive grid, "fires we're following", and the search
// function only require a handful of information about a fire.  It doesn't
// make sense to query the entire record, which includes bulky items like
// perimeter geometry and tweets.

import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  _id: DS.attr('string'),
  name: DS.attr('string'),
  slug: DS.attr('string'),
  acres: DS.attr('string'),
  contained: DS.attr('string'),
  countyName: DS.attr('string'),
  county: Ember.computed('countyName', function(){
    let countyName = this.get('countyName');
    if(countyName){
      return `${countyName} County`;
    }
  }),
  containment: Ember.computed('contained', function(){
    return this.get('contained') || '0%';
  }),
  coordinates: Ember.computed('lat', 'long', function(){
    return {
      lat: this.get('lat'),
      long: this.get('long')
    }
  }),
  lat: DS.attr('string'),
  long: DS.attr('string'),
  startedAt: DS.attr('date')
});

