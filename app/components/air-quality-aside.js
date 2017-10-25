import Ember from 'ember';

const airQualityMessages = [
  'Air quality is considered satisfactory, and air pollution poses little or no risk.',
  'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
  'Members of sensitive groups may experience health effects.  The general public is not likely to be affected.',
  'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
  'Health alert: everyone may experience more serious health effects.',
  'Health warnings of emergency conditions. The entire population is more likely to be affected.'
];

export default Ember.Component.extend({
  classNames: ['air-quality-aside', 'important-facts__item'],
  classNameBindings: ['categoryClassName'],
  categoryName: Ember.computed('airQuality.categoryName', function(){
    let name   = this.get('airQuality.categoryName');
    return (name || 'Good');
  }),
  categoryClassName: Ember.computed('categoryName', function(){
    let suffix = Ember.String.dasherize(this.get('categoryName'));
    return `air-quality-aside--${suffix}`;
  }),
  categoryHeading: Ember.computed('airQuality.categoryNumber', function(){
    let number  = this.get('airQuality.categoryNumber');
    let message = airQualityMessages[number];
    if(message){
      return message;
    } else if (this.get('categoryName') == 'Good') {
      return airQualityMessages[0];
    }
  }),
});
