function (doc) {
  var overrides = doc.overrides || {};
  var slug      = overrides.slug || doc.slug;
  var startedAt = new Date(overrides.startedAt || doc.startedAt).getTime();
  emit([startedAt, slug], [
    doc._id,
    overrides.name || doc.name,
    overrides.locationDescription || doc.locationDescription,
    overrides.lat || doc.lat,
    overrides.long || doc.long,
    overrides.acres || doc.acres,
    overrides.contained || doc.contained,
    overrides.county || doc.county,
    overrides.thumbnailId || doc.thumbnailId
  ]);
}

