import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: Ember.inject.service(),
  setTitle(title) {
    this.set('headData.title', title);
  }
});

Router.map(function() {
  this.route('fire', {path: '/:slug'});
  this.route('embed', {path: '/:slug/embed'});
  this.route('content');
  this.route('archive');
});

export default Router;
