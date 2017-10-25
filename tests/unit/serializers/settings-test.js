import { moduleForModel, test } from 'ember-qunit';

moduleForModel('settings', 'Unit | Serializer | settings', {
  // Specify the other units that are required for this test.
  needs: ['serializer:settings']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
