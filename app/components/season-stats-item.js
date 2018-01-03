import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['season-stats__item'],
  classNameBindings: [
    'isBelowAverage:season-stats__item--below-average',
    'isAverage:season-stats__item--average',
    'isAboveAverage:season-stats__item--above-average'
  ],
  isBelowAverage: Ember.computed('trend', function(){
    return this.get('trend') < 0;
  }),
  isAverage: Ember.computed('trend', function(){
    return this.get('trend') == 0;
  }),
  isAboveAverage: Ember.computed('trend', function(){
    return this.get('trend') > 0;
  })
});

