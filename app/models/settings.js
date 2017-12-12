import DS from 'ember-data';

export default DS.Model.extend({
  _id: DS.attr('string'),
  californiaFireResources: DS.attr('array'),
  featuredFires: DS.hasMany('fire'),
  faqs: DS.attr('array'),
  aliases: DS.attr('array')
});
