import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('map-tiles', 'Integration | Component | map tiles', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{map-tiles}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#map-tiles}}
      template block text
    {{/map-tiles}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
