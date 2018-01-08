import Ember from 'ember';
import config from './config/environment';
import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import RouterScroll from 'ember-router-scroll';


const Router = Ember.Router.extend(RouterScroll, {
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
      let page  = this.get('url');
      let title = this.getWithDefault('headData.title', 'unknown'); 
      let metrics = get(this, 'metrics');
      metrics.trackPage({ page, title, dimension6: 'Southern California Public Radio', dimension7: 'Story' });
    });
  }
});

Router.map(function() {
  this.route('embed', {path: '/:slug/embed'});
  this.route('map',   {path: '/:slug/map'});
  this.route('fire',  {path: '/:slug'});
  this.route('content',   {path: '/articles/:slug'});
  this.route('archive');
  this.route('not-found', {path: '/*path'});
  this.route('error');
});



export default Router;
