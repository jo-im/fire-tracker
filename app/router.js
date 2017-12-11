import Ember from 'ember';
import config from './config/environment';
import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: Ember.inject.service(),
  setTitle(title) {
    this.set('headData.title', title);
  },
  metrics: Ember.inject.service(),
  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },
  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page  = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('embed', {path: '/:slug/embed'});
  this.route('fire', {path: '/:slug'});
  this.route('content');
  this.route('archive');
  this.route('not-found', {path: '/*path'});
});



export default Router;
