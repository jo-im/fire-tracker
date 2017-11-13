import Ember from 'ember';
import DS from 'ember-data';
import moment from 'npm:moment';
import ENV from '../config/environment';

const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

const shortMonthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];

export default DS.Model.extend({
  _id: DS.attr('string'),
  name: DS.attr('string'),
  slug: DS.attr('string'),
  description: DS.attr('string'),
  computedDescription: Ember.computed(function() {
    let description = this.get('description');
    if(description){
      return description;
    }
    let output         = ['No new updates for this fire.'];
    let acres          = this.get('acreage');
    let containment    = this.get('contained');
    let cause          = this.get('whatCause');
    let roadClosures   = this.get('roadClosures');
    let schoolClosures = this.get('schoolClosures');

    if(acres && containment){
      output.push(`${acres} acres have burned, and the fire has been ${containment} contained.`);
    } else if (acres) {
      output.push(`${acres} acres have burned so far.`)
    } else if (containment) {
      output.push(`The fire has been ${containment} contained.`);
    }

    if(cause){
      if(cause === 'Under Investigation'){
        output.push('The cause is currently under investigation');
      } else {
        output.push(`The cause was ${cause.toLowerCase()}`);
      }
    }

    if(roadClosures && schoolClosures){
      output.push("Road and school closures are in effect.  See details below.");
    } else if (roadClosures) {
      output.push("Road closures are in effect.  See details below.");
    } else if (schoolClosures) {
      output.push("School closures are in effect.  See details below.");
    }

    return output.join('  ');
  }),
  startedAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  cause: DS.attr('string'),
  href: DS.attr('string'),
  links: DS.attr(),
  administrativeUnit: DS.attr('string'),
  locationDescription: DS.attr('string'),
  conditions: DS.attr('string'),
  cooperatingAgencies: DS.attr('string'),
  currentSituation: DS.attr('string'),
  evacuations: DS.attr('string'),
  fuelsInvolved: DS.attr('string'),
  roadClosures: DS.attr('string'),
  schoolClosures: DS.attr('string'),
  weatherConcerns: DS.attr('string'),
  images: DS.attr('array'),
  audio: DS.attr('array'),
  video: DS.attr('array'),
  tweets: DS.attr('array'),
  phoneNumbers: DS.attr('array'),
  acres: DS.attr('string'),
  contained: DS.attr('string'),
  lat: DS.attr('string'),
  long: DS.attr('string'),
  perimeter: DS.attr(),
  airQuality: DS.attr(),
  structuresThreatened: DS.attr('string'),
  structuresDestroyed: DS.attr('string'),
  injuries: DS.attr('string'),
  isOutdated: DS.attr('boolean', {default: false}),
  county: DS.attr('string'),
  countyName: Ember.computed('county', function(){
    let countyName = this.get('county');
    if(countyName){
      return `${countyName} County`;
    }
  }),
  containment: Ember.computed('contained', function(){
    return this.get('contained') || '0%';
  }),
  duration: Ember.computed('startedAt', function(){
    let startedAt = this.get('startedAt');
    if(startedAt){
      let a = moment(startedAt);
      let b = moment(new Date());
      let days = Math.abs(b.diff(a, 'days'));
      return `${days} days`;
    }
  }),
  shouldPlaybackPerimeter: Ember.computed('perimeter', function(){
    let perimeter       = this.get('perimeter') || {features: []};
    let numTimeInstants = perimeter.features.length || 0;
    if(numTimeInstants > 2){
      return true;
    } else {
      return false;
    }
  }),
  // startedAt: Ember.computed('reportedAt', function(){
  //   let time = this.get('reportedAt') || this.get('updatedAt');
  //   if(time){
  //     let date = new Date(time);
  //     return `${shortMonthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  //   }
  // }),
  latLong: Ember.computed('lat', 'long', function(){
    let lat  = this.get('lat');
    let long = this.get('long');
    if(lat && long){
      return [lat, long]
    }
  }),

  markerIcon: Ember.computed(function(){
    return L.icon({
      iconUrl: '/images/marker-icon.png',
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconSize: [46, 60],
      iconAnchor: [23, 60],
      popupAnchor: [0, 57],
      shadowUrl: '/images/marker-shadow.png',
      shadowRetinaUrl: '/images/marker-shadow-2x.png',
      shadowSize: [45, 29],
      shadowAnchor: [23, 29]
    });
  }),
  // pascalName: Ember.computed('name', function(){
  //   return this.get('name').replace(/(\w)(\w*)/g, (g0,g1,g2) => {
  //     return g1.toUpperCase() + g2.toLowerCase();
  //   });
  // }),
  whatCause: Ember.computed('cause', function(){
    return this.get('cause') || 'Under Investigation';
  }),
  lastUpdated: Ember.computed('updatedAt', function(){
    return moment(this.get('updatedAt')).format('MMMM Do YYYY, h:mm a');
  }),
  acreage: Ember.computed('acres', function(){
    let acres = this.get('acres') || '0';
    if(acres){
      return acres.replace(/,\s*$/, '');
    }
  }),
  latestTweets: Ember.computed('tweets', function(){
    let tweets = this.get('tweets') || [];
    return tweets.splice(0,5);
  }),
  thumbnailId: DS.attr('number'),
  thumbnail: Ember.computed('thumbnailId', function(){
    let thumbnailId = this.get('thumbnailId');
    if(thumbnailId){
      return `${ENV.assethost.protocol}://${ENV.assethost.host}/i/original/${thumbnailId}-full.jpg`;
    }
  })
});

