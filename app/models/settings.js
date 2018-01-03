import DS from 'ember-data';

export default DS.Model.extend({
  _id: DS.attr('string'),
  californiaFireResources: DS.attr(),
  featuredFires: DS.hasMany('fire'),
  faqs: DS.attr(),
  aliases: DS.attr(),
  seasonStats: DS.attr()
});

