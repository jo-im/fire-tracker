import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'iframe',
  didRender(){
    this._super(...arguments);
    let iframe  = this.$()[0];
    let content = this.$().html();
    this.$().after(iframe);

    let cssLink  = document.createElement("link");
    cssLink.href = "/assets/oyster-cracker.css"; 
    cssLink.rel  = "stylesheet"; 
    cssLink.type = "text/css"; 
    let vendor  = document.createElement("link");
    vendor.href = "/assets/vendor.css"; 
    vendor.rel  = "stylesheet"; 
    vendor.type = "text/css";
    iframe.contentDocument.head.appendChild(cssLink);
    iframe.contentDocument.head.appendChild(vendor);

    let children = this.$()[0].children;
    let len      = children.length;
    let i        = 0;
    while(i<len){
      let child = children[i];
      iframe.contentDocument.body.appendChild(child);
      i++;
    }
  },
  willRender(){
    this._super(...arguments);
  },
  click(){
    alert('hey');
  }
});
