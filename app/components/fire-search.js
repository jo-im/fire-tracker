import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['fire-search'],
  style: Ember.computed('background', function(){
    let bg = this.get('background');
    if(bg){
      return `background-image: url('${bg}');`;
    }
  }),
  background: Ember.computed(function(){
    let i = Math.floor(Math.random() * 20) + 1;
    let n = Array(Math.max(2 - String(i).length + 1, 0)).join(0) + i;
    return `/images/backgrounds/Search_Background-Image${n}.jpg`;
  }),
  attributeBindings: ['style']
});

