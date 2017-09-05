import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('featured-incidents', 'Integration | Component | featured incidents', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{featured-incidents}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#featured-incidents}}
      template block text
    {{/featured-incidents}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
