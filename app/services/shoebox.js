import Ember from 'ember';
import md5 from 'npm:blueimp-md5';

const {
  Service,
  inject: {service},
  $
} = Ember;

export default Service.extend({
  fastboot:  service(),

  pushResponse(requestToken, response) {
    this.get('fastboot.shoebox').put(
      requestToken,
      JSON.stringify(response)
    )
    return response
  },

  popResponse(requestToken) {
    let response = this.get('fastboot.shoebox').retrieve(requestToken);
    this.eraseResponse(requestToken);
    return response ? JSON.parse(response) : response;
  },

  eraseResponse(requestToken) {
    $(`#shoebox-${requestToken}`).remove();
    this.set(`fastboot.shoebox.${requestToken}`, undefined);
  },

  tokenizeAjaxRequest(url, options = {}) {
    return md5(`${url}---${JSON.stringify(options)}`)
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
  }
})
