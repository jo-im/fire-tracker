import Ember from 'ember';
import fetch from 'fetch';

export default Ember.Component.extend({
  classNames: ['fire-search'],
  fastboot: Ember.inject.service(),
  style: Ember.computed('background', 'willRender', function(){
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
  willRender: Ember.computed('background', function(){
    return fetch(this.get('background'));
  }),
  attributeBindings: ['style'],
  actions: {
    onKeyUp(){}
  }
});

