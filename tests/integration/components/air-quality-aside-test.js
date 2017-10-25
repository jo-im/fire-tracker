import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('air-quality-aside', 'Integration | Component | air quality aside', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{air-quality-aside}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#air-quality-aside}}
      template block text
    {{/air-quality-aside}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
