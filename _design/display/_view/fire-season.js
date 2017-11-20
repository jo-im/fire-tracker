// This is what gives us the fire season stats
// on the Fire Tracker homepage.  When the reduce
// function is set to `_stats` in the Fauxton interface,
// the API endpoint will return the total number of fires
// in a year(count) and the total acres burned(sum).  If you
// don't set the reduce function to `_stats`, you're 
// gonna have a bad time.
//
// Note that the `current year` is hard coded.  I've left it
// that way because it's likely we won't want it to automatically
// change over to the next year on January 1st when all the
// status suddenly become zero.  To bump the year, you can
// just change it in this function.  We will eventually add
// a way to do this in the Fire Tracker admin interface.

function (doc) {
  var overrides = doc.overrides || {};
  var currentYear = 2017;
  var fireYear    = (new Date(overrides.startedAt || doc.startedAt || '3000-12-20T10:13:20.001Z')).getFullYear();
  if(fireYear === currentYear){
    emit(doc._id, parseInt(doc.acres || 0)); 
  }
}

