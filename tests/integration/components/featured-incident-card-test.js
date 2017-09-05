import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('featured-incident-card', 'Integration | Component | featured incident card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{featured-incident-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#featured-incident-card}}
      template block text
    {{/featured-incident-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
