/* global MobileDetect */

import Ember from 'ember';
import fetch from 'fetch';

/**
 * A shared component for searching fires.
 * 
 * It has no built in logic for searching.  Extend it to include search functionality.
 * @module fire-search
 * @example
 * // a component extended from fire-search may be used like this
 * {{custom-fire-search searchData=model heading="Am I near a wildfire?" placeholder="Enter a zipcode, city or fire name"}}
 */

/**
 * @class FireSearch
 * @property {string} heading     - The heading to be displayed.
 * @property {string} placeholder - Placeholder text for the search box.
 * @property {string} style       - A computed style tag value to add a random background image and a default gradient.
 * @property {string} background  - A computed random background image path.
 */

export default Ember.Component.extend({
  classNames: ['fire-search'],
  classNameBindings: ['isFocused:fire-search--focused'],
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
    /**
     * **Action** Gets called on the keyup event.  Does nothing by default.  Override with your own function.
     * @function onKeyUp
     */
    onKeyUp(){},
    /**
     * **Action** If the browser is mobile, bring the search box to the top of the viewport.
     * @function focus
     */
    focus(){
      let md = new MobileDetect(window.navigator.userAgent);
      if(md.phone()) {
        window.scrollTo(0, this.element.querySelector('.fire-search__search-area').getBoundingClientRect().top);
      }
    },
    /**
     * **Action** Removes focus from the component.  Does nothing by default.
     * @function unfocus
     */
    unfocus(){}
  }
});

