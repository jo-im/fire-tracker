Fire Tracker
==============

KPCC's tool for following & researching California wildfires.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/) (optional – needed for testing)
* [CouchDB](https://http://couchdb.apache.org/) or [PouchDB](https://pouchdb.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd fire-tracker`
* `npm install`

An instance of either CouchDB or PouchDB should be available to the application.  For development, it's recommended that you run one of these database applications locally.  [PouchDB Server](https://github.com/pouchdb/pouchdb-server) is the easiest way to to this.  Information on how to seed your database with the necessary design documents is available in the [Firewatch](https://github.com/scpr/firewatch) repo. 

You will then need to populate a `.env` file in the project root with the required environment variables.  Use `.env.template` as a reference.

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

This application comes with a Dockerfile that will allow you to build a Docker image for production deployment.  The image builds with Fastboot Server to serve the application pages and Nginx for static assets.  The application is served through port `8080`.

At KPCC, we use Rancher to manage Docker containers and we have a stack setup to load-balance & forward requests between different containers under the same domain.

#### More on building Docker images

The Docker file was written to support a multi-stage build.  For example, if you want to just create a new build of the Ember application without rebuilding the base image(native libraries) or the dependencies image(node modules), you can simply target the *release* build like so:

```sh
docker build -t firetracker --target release .
```

If you've changed your `package-json` file, then you will probably want to target *dependencies*:

```sh
docker build -t firetracker --target dependencies .
```

That stage will run `npm install` and then build the Ember app.

### API

The API used for the backend is run with CouchDB.  CouchDB is a NoSQL database that also comes with an HTTP REST API which we use to store records on fires, articles, and application settings.

The CouchDB instance needs to have these three databases initialized:

- fires
- settings
- content

Think of CouchDB "databases" in the same way you would think of "tables" in a relational database.

This application mainly accesses the `fires` database through [CouchDB views](http://docs.couchdb.org/en/2.0.0/couchapp/ddocs.html#view-functions), which are special records that contain JavaScript map/reduce functions to create filtered results that are indexed.  This is how we can retrieve lots of sparse fire records without bringing in information we don't need(like perimeter data and tweets), keeping the application performant.

Copies of the required design documents are located in the [Firewatch repo](https://github.com/SCPR/firewatch/tree/master/seed).

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

