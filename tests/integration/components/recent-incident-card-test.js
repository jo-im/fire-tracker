import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('recent-incident-card', 'Integration | Component | recent incident card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{recent-incident-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#recent-incident-card}}
      template block text
    {{/recent-incident-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
