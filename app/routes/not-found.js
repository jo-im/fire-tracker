import Ember from 'ember';
import ArchiveRoute from './archive';

export default ArchiveRoute.extend({
  titleToken: 'Not Found',
  fastboot: Ember.inject.service(),
  activate() {
    this._super();
    if (this.get('fastboot.isFastBoot')) {
      this.set('fastboot.response.statusCode', 404);
    }
  },
  actions: {
    // didTransition() {
      // if (this.get('fastboot.isFastBoot')) {
        // this.set('fastboot.response.statusCode', 404);
      // }
    // }
  }
});

