import Ember from 'ember';

const { Error: EmberError } = Ember;

export function FetchError(payload, message = 'Fetch operation failed') {
  EmberError.call(this, message);
  this.payload = payload;
}

FetchError.prototype    = Object.create(EmberError.prototype);

export function NotFoundError(payload) {
  FetchError.call(this, payload, 'Record Not Found');
}

NotFoundError.prototype = Object.create(FetchError.prototype);

