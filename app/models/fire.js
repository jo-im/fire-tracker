import Ember from 'ember';
import DS from 'ember-data';
import moment from 'npm:moment';

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
    let acres          = this.get('stats.damage.acres');
    let containment    = this.get('stats.damage.contained');
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
  stats: DS.attr(),
  location: DS.attr(),
  perimeter: DS.attr(),
  contact: DS.attr(),
  isOutdated: DS.attr('boolean', {default: false}),
  county: Ember.computed('location.county', function(){
    let countyName = this.get('location.county');
    if(countyName){
      return `${countyName} County`;
    }
  }),
  containment: Ember.computed('stats.damage.contained', function(){
    return this.get('stats.damage.contained') || '0%';
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
  // startedAt: Ember.computed('reportedAt', function(){
  //   let time = this.get('reportedAt') || this.get('updatedAt');
  //   if(time){
  //     let date = new Date(time);
  //     return `${shortMonthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  //   }
  // }),
  lat: Ember.computed('location.coordinates.lat', function(){
    return this.get('location.coordinates.lat');
  }),
  long: Ember.computed('location.coordinates.long', function(){
    return this.get('location.coordinates.long');
  }),
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
  pascalName: Ember.computed('name', function(){
    return this.get('name').replace(/(\w)(\w*)/g, (g0,g1,g2) => {
      return g1.toUpperCase() + g2.toLowerCase();
    });
  }),
  hasResourcesDeployed: Ember.computed('stats.resources', function(){
    return Object.keys(this.get('stats.resources') || []).length ? true : false;
  }),
  hasDamageReport: Ember.computed('stats.damage', function(){
    return Object.keys(this.get('stats.damage') || []).length ? true : false;
  }),
  whatCause: Ember.computed('cause', function(){
    return this.get('cause') || 'Under Investigation';
  }),
  lastUpdated: Ember.computed('updatedAt', function(){
    return moment(this.get('updatedAt')).format('MMMM Do YYYY, h:mm a');
  }),
  acres: Ember.computed('stats.damage.acres', function(){
    let acres = this.get('stats.damage.acres') || '0';
    if(acres){
      return acres.replace(/,\s*$/, '');
    }
  })
});
