import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['spread-icons'],
  classNameBindings: ['getClassNames'],
  fastboot: Ember.inject.service(),
  getClassNames: Ember.computed('extra-classes', function(){
    return (this.get('extra-classes') || '').replace(',', ' ');
  }),
  subject: Ember.computed('fire', function(){
    return `Learn about the ${this.get('fire.name')} in ${this.get('fire.county')} via @KPCC's Fire Tracker`;
  }),
  href: Ember.computed('fire', function(){
    if(this.get('fastboot.isFastBoot') || !this.get('fire.slug')){
      return '#';
    }
    return `${window.location.protocol}://${window.location.host}/${this.get('fire.slug')}`;
  }),
  mailtoHref: Ember.computed('fire', function(){
    let body    = encodeURIComponent(`${this.get('fire.name')}: ${this.get('href')}`);
    return `mailto:?subject=${encodeURIComponent(this.get('subject'))}&body=${body}`;
  }),
  tweetHref: Ember.computed('fire', function(){
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.get('subject'))}:%20${encodeURIComponent(this.get('href'))}`;
  }),
  facebookHref: Ember.computed('fire', function(){
    return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(this.get('href'))}?t=${encodeURIComponent(this.get('subject'))}`;
  })
});
