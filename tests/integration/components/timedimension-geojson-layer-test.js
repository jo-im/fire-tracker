import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('timedimension-geojson-layer', 'Integration | Component | timedimension geojson layer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{timedimension-geojson-layer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#timedimension-geojson-layer}}
      template block text
    {{/timedimension-geojson-layer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
