import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['fire-search'],
  fastboot: Ember.inject.service(),
  style: Ember.computed('background', function(){
    let bg = this.get('background');
    if(bg){
      return `background-image:  url('${bg}'), linear-gradient(to bottom, #0d0101 0%, #a24e13 100%);`;
    }
  }),
  background: Ember.computed(function(){
    if(this.get('fastboot.isFastBoot')){
      return '';
    }
    let i = Math.floor(Math.random() * 20) + 1;
    let n = Array(Math.max(2 - String(i).length + 1, 0)).join(0) + i;
    return `/images/backgrounds/Search_Background-Image${n}.jpg`;
  }),
  attributeBindings: ['style'],
  actions: {
    onKeyUp(){}
  }
});

