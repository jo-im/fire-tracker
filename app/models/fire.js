import Ember from 'ember';
import DS from 'ember-data';
import moment from 'npm:moment';
import ENV from '../config/environment';
import L from '../lib/L';

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
  pageDescription: Ember.computed('name', 'countyName', 'startedAt', 'locationDescription', function(){
    return [
      `The ${this.get('name')}`, 
      this.get('countyName') ? `in ${this.get('countyName')}` : null,
      this.get('startedAt') ? `began burning ${moment(this.get('startedAt')).format('dddd, MMMM Do YYYY')}` : null,
      this.get('locationDescription') ? `near ${this.get('locationDescription')}` : null,
      '.',
      this.get('updatedAt') ? `As of ${moment(this.get('updatedAt')).format('dddd, MMMM Do YYYY')}` : null,
      this.get('updatedAt') ? ',' : null,
      this.get('acreage') ? `${this.get('acreage')} acres have burned` : null,
      (this.get('containment') && this.get('acreage')) ? ', and' : '.',
      this.get('containment') ? `the fire is ${this.get('containment')} contained.` : null
    ].filter(x => x).join(' ').replace(/\s(,|\.)/g, '$1')
  }),
  socialDescription: Ember.computed('name', 'countyName', 'startedAt', 'locationDescription', function(){
    return [
      `Get details about the ${this.get('name')}`, 
      this.get('countyName') ? `in ${this.get('countyName')}` : null,
      this.get('startedAt') ? `that began burning ${moment(this.get('startedAt')).format('dddd, MMMM Do YYYY')}` : null,
      this.get('locationDescription') ? `near ${this.get('locationDescription')}` : null
    ].filter(x => x).join(' ').replace(/\s(,|\.)/g, '$1')
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
  damageAssessment: DS.attr('string'),
  evacuations: DS.attr('string'),
  fuelsInvolved: DS.attr('string'),
  roadClosures: DS.attr('string'),
  schoolClosures: DS.attr('string'),
  weatherConcerns: DS.attr('string'),
  images: DS.attr(),
  audio: DS.attr(),
  video: DS.attr(),
  tweets: DS.attr(),
  phoneNumbers: DS.attr(),
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
  isExtinguished: DS.attr('boolean'),
  extinguishedAt: DS.attr('date'),
  isLegacy: DS.attr('boolean'),
  sources: DS.attr(),
  hashtag: DS.attr('string'),
  wasExtinguished: Ember.computed('isExtinguished', 'extinguishedAt', 'isLegacy', function(){
    // just consider legacy fires to be extinguished
    return (this.get('isExtinguished') || this.get('extinguishedAt') || this.get('isLegacy')) ? true : false;
  }),
  shouldDisplayBurnedFor: Ember.computed('wasExtinguished', 'burnedFor', function(){
    return (this.get('wasExtinguished') && this.get('burnedFor') && (this.get('burnedFor') > 0)) ? true : false;
  }),
  shouldDisplayDuration: Ember.computed('wasExtinguished', 'duration', function(){
    return (this.get('duration') && (this.get('duration') > 0)) ? true : false;
  }),
  shouldDisplayAcres: Ember.computed('acres', function(){
    return parseInt(this.get('acres')) > 0;
  }),
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
      // return `${days} days`;
      return days;
    }
  }),
  burnedFor: Ember.computed('startedAt', 'extinguishedAt', function(){
    let startedAt      = this.get('startedAt');
    let extinguishedAt = this.get('extinguishedAt');
    if(startedAt && extinguishedAt){
      let a = moment(startedAt);
      let b = moment(extinguishedAt);
      let days = Math.abs(b.diff(a, 'days'));
      // return `${days} days`;
      return days;
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
      popupAnchor: [0, -45],
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
    return (this.get('tweets') || []).filter(t => !t.isHidden).splice(0, 5);
  }),
  thumbnailId: DS.attr('number'),
  thumbnail: Ember.computed('thumbnailId', function(){
    let thumbnailId = this.get('thumbnailId');
    if(thumbnailId){
      return `${ENV.assethost.endpoint}/i/original/${thumbnailId}-full.jpg`;
    }
  })
});

