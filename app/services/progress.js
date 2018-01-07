import Ember from 'ember';
import progress from 'npm:nprogress';

export default Ember.Service.extend({
  fastboot: Ember.inject.service(),
  init(){
    if(this.get('fastboot.isFastBoot')) return;
    this.set('instance', )
  },
  start(){
    if(this.get('fastboot.isFastBoot')) return;
    progress.start();
  },
  inc(amount){
    if(this.get('fastboot.isFastBoot')) return;
    progress.inc(amount);
  },
  done(){
    if(this.get('fastboot.isFastBoot')) return;
    progress.set(0.95);
    Ember.run.later(() => {
      progress.done();
    }, 1000);
  }
});
