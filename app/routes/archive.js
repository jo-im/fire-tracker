import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Archive',
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  model(){
    return this.get('store').query('sparse-fire', {queries: [{descending: true}]});
  },
  activate() {
    this._super();
    if(!this.get('isFastBoot')){
      window.scrollTo(0,0);
      window.addEventListener("mousewheel", this.onmousewheel);
    }
  },
  onmousewheel(e){
    // fixes infinite scroll in chrome
    if (e.deltaY === 1) {
      e.preventDefault()
    }
  },
  actions: {
    // These actions add the dark theme to the body element
    // in order to hide page redraw artifacts while scrolling,
    // which look much more apparent when the body background is white.
    loading() {
      if(this.get('isFastBoot')) return;
      Ember.$('body').addClass("t-dark");
    },
    willTransition(){
      if(this.get('isFastBoot')) return;
      Ember.$('body').removeClass("t-dark");
      window.removeEventListener("mousewheel", this.onmousewheel);
    }
  }
});
