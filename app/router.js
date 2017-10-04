import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('fire', {path: '/:slug'});
  this.route('content');
  this.route('archive');
});

export default Router;
