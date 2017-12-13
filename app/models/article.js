import DS from 'ember-data';
import fetch from 'fetch';
import Ember from 'ember';
import ENV from '../config/environment';


export default DS.Model.extend({
  title: DS.attr('string'),
  shortTitle: DS.attr('string'),
  slug: DS.attr('string'),
  teaser: DS.attr('string'),
  abstract: DS.attr('string'),
  body: DS.attr('string', {defaultValue: ''}),
  attributions: DS.attr({defaultValue: []}),
  tags: DS.attr({defaultValue: []}),
  links: DS.attr({defaultValue: []}),
  audio: DS.attr({defaultValue: []}),
  publishedAt: DS.attr('date'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  assets: DS.attr({defaultValue: []}),
  leadAsset: Ember.computed('assets', function(){
    let asset = (this.get('assets') || [])[0];
    if(!asset) return;
    return asset;
    // return fetch(`${ENV.assethost.endpoint}/api/assets/${asset.id}/?auth_token=t5m0KOPV4R4ZdoCy0xdHFg`)
    //   .then(resp => resp.json())
    //   .then(json => {
    //     json.caption = asset.caption || json.caption;
    //     json.title   = asset.title   || json.title;
    //     return json;
    //   })
  }),
  generatedTeaser: Ember.computed('teaser', function(){
    return this.get('teaser') || this.get('title');
    // if(teaser) return teaser;
    // let body   = this.get('body');
    // let max    = 300;
    // return (teaser.length > max ? teaser.substring(0, max) + '...' : teaser);
  })
});
