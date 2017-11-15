function (doc) {
  var overrides = doc.overrides || {};
  var output = {};
  Object.keys(doc).forEach(function (k) {
    output[k] = overrides[k] || doc[k];
  });
  emit(doc.slug, output);
};