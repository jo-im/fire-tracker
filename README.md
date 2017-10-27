Oyster Cracker
==============

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd oyster-cracker`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

No deployment process has been outlined yet.

Hypothetically, the basic application assets can be served from a basic file-server like Nginx, or even S3, and a load balancer can direct most requests directly to `index.html` where the Ember router will take over.  Special routes can be mapped to CouchDB databases so they are hosted under the same domain(no opportunity for weird CORS issues).  The same thing could possibly be done for an admin application(i.e. Fire Marshal), so when a request to `/admin` is made, the respose is served from the admin application rather than Oyster Cracker or CouchDB.

### API

The API used for the backend is run with CouchDB.  CouchDB is a NoSQL database that also comes with an HTTP REST API which we use to store records on fires, articles, and application settings.

The CouchDB instance needs to have these three databases initialized:

- incidents
- settings
- content

Think of CouchDB "databases" in the same way you would think of "tables" in a relational database.

This application mainly accesses the `incidents` database through [CouchDB views](http://docs.couchdb.org/en/2.0.0/couchapp/ddocs.html#view-functions), which are special records that contain JavaScript map/reduce functions to create filtered results that are indexed.  This is how we can retrieve lots of sparse fire records without bringing in information we don't need(like perimeter data and tweets), keeping the application performant.

Copies of design documents are located under the `_design/` directory in this repo.

#### Authentication

Public writes are limited by a `validate_doc_update` function in a design document.  This is how this application can read records while only users in the `_users` database can make updates.

There are many ways to [authenticate with CouchDB](http://docs.couchdb.org/en/2.0.0/api/server/authn.html).

The best way for a server-side application to authenticate is to use HTTP Basic authentication through an HTTPS connection.  Let's say you have user called `apiuser` and their password is `notsorandompass`; you generate a token by combining them into a colon-delimited stirng like `apiuser:notsorandompass` and Base64 encoding it.  That would generate `YXBpdXNlcjpub3Rzb3JhbmRvbXBhc3M=` as your token.  On each request, include a header called `Authorization` with the value `Basic YXBpdXNlcjpub3Rzb3JhbmRvbXBhc3M=`.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* [couchdb](http://couchdb.apache.org/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

