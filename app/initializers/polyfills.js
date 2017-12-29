import objectAssign from 'npm:object.assign';

export function initialize(/* application */) {
  objectAssign.shim();
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'polyfills',
  initialize
};
