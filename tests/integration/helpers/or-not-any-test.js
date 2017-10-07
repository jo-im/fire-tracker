
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('or-not-any', 'helper:or-not-any', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{or-not-any inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

