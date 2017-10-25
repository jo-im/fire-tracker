Design Docs
===========

Design documents are a [feature of CouchDB](http://docs.couchdb.org/en/2.1.0/ddocs/) to build indexes, validate document updates, format query results, and filter replications.  They are merely documents that contain JavaScript functions that manipulate documents.

An example use case for a design document is the Fire Tracker archive grid component, where we only need sparse information about individual fires – having to load all the data about each fire, including perimeter data and tweets, would slow down page load time.  A design document can be written with a view to return fires with only the data we need.

## So why is this here?

It's conceivable that our database can get obliterated.  In which case, we should have backups of these database functions.  Those backups will live here.

We can probably have something that can automatically push these into whatever specified database, but for now this is fine the way it is.

Eventually we will want to have the load balancer redirect `_all_docs` to 404, and also force `_changes` to only display recent changes.

