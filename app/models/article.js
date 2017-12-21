import DS from 'ember-data';
import Ember from 'ember';

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
  }),
  generatedTeaser: Ember.computed('teaser', function(){
    return this.get('teaser') || this.get('title');
  })
});
