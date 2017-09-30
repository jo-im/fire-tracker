import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'figure',
  classNames: ['c-figure'],
  classNameBindings: [
    'widescreen:c-figure--widescreen',
    'four-by-three:c-figure--four-by-three',
    'cinematic:c-figure--cinematic',
    'portrait:c-figure--portrait',
    'square:c-figure--square',
    'emphasized:c-figure--emphasized',
  ]
});
