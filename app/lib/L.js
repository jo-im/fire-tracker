/* global L */
/* global Proxy */

// it will polyfill the global namespace rather than returning the Proxy object.
import _Proxy from 'npm:proxy-polyfill'; // eslint-disable-line no-unused-vars


let L_ = null;

if (typeof L !== 'undefined') {
  L_ = L;
} else {
  let N = () => {};
  let handler = {
    get() {
      return N;
    }
  };

  L_ = Proxy.create ? Proxy.create(handler) : new Proxy({}, handler);
  L_.Icon.Default = {};
  L_.tileLayer.wms = N;
}

export default L_;

