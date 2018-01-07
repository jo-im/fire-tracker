import Ember from 'ember';
import ShoeboxMixin from 'fire-tracker/mixins/shoebox';
import { module, test } from 'qunit';

module('Unit | Mixin | shoebox');

// Replace this with your real tests.
test('it works', function(assert) {
  let ShoeboxObject = Ember.Object.extend(ShoeboxMixin);
  let subject = ShoeboxObject.create();
  assert.ok(subject);
});
