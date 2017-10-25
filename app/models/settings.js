import DS from 'ember-data';

export default DS.Model.extend({
  _id: DS.attr('string'),
  featuredFires: DS.hasMany('fire'),
  faqs: DS.attr('array')
});
