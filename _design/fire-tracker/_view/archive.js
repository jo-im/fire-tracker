// function (doc) {
//   var d = {};
//   Object.keys(doc).forEach(function(k){ 
//     if(k !== 'perimeter' && k !== 'tweets'){
//       d[k] = doc[k];
//       var overrides = doc.overrides || {};
//       d[k] = overrides[k] || doc[k];
//     }
//   });
//   emit(doc._id, d);
// }

function (doc) {
  var overrides = doc.overrides || {};

  emit(doc._id, {
    _id: doc._id,
    name: overrides.name || doc.name,
    startedAt: overrides.startedAt || doc.startedAt,
    location: overrides.location || doc.location,
    stats: overrides.stats || doc.stats
  });
}

