import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['incident-search'],
  style: Ember.computed('background', function(){
    let bg = this.get('background');
    if(bg){
      return `background: url('${bg}');`;
    }
  }),
  attributeBindings: ['style']
});

