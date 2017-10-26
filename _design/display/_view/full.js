// class TinyDotProp {
//   constructor(obj){
//     this.obj = obj;
//   }
//   get(key, value){
//     var current = this.obj;
//     key.split('.').forEach(p => current = (Array.isArray(current) || current) ? current[p] : null );
//     return current;
//   }
//   set(key, value){
//     var path = key.split(/[\.|\[|\]]/);
//     var k    = path.pop();
//     (this.get(path.join()) || {})[k] = value;
//     return value;
//   }
//   delete(key, value){
//     var path = key.split(/[\.|\[|\]]/);
//     var k    = path.pop();
//     var obj  = this.get(path.join()) || {};
//     delete obj[k];
//     return true;
//   }
//   toObject(){
//     return this.obj;
//   }
// }

// // class MetaProp {
// //   constructor(...objects){
// //     this.objects = objects.map(o => new TinyDotProp(o));
// //   }
// //   get(key){
// //     return this.objects.map(o => o.get(key)).filter(o => o)[0];
// //   }
// // }

// class MetaProp {
//   constructor(object, overrides){
//     this.object  = new TinyDotProp(object);
//     this.overrides = overrides || {};
//   }
//   get(key){
//     return this.overrides[key] || this.object.get(key);
//     // return this.objects.map(o => o.get(key)).filter(o => o)[0];
//   }
// }






'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TinyDotProp = function () {
  function TinyDotProp(obj) {
    _classCallCheck(this, TinyDotProp);

    this.obj = obj;
  }

  _createClass(TinyDotProp, [{
    key: 'get',
    value: function get(key, value) {
      var current = this.obj;
      key.split('.').forEach(function (p) {
        return current = Array.isArray(current) || current ? current[p] : null;
      });
      return current;
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      var path = key.split(/[\.|\[|\]]/);
      var k = path.pop();
      (this.get(path.join()) || {})[k] = value;
      return value;
    }
  }, {
    key: 'delete',
    value: function _delete(key, value) {
      var path = key.split(/[\.|\[|\]]/);
      var k = path.pop();
      var obj = this.get(path.join()) || {};
      delete obj[k];
      return true;
    }
  }, {
    key: 'toObject',
    value: function toObject() {
      return this.obj;
    }
  }]);

  return TinyDotProp;
}();

var MetaProp = function () {
  function MetaProp(object, overrides) {
    _classCallCheck(this, MetaProp);

    this.object = new TinyDotProp(object);
    this.overrides = overrides || {};
  }

  _createClass(MetaProp, [{
    key: 'get',
    value: function get(key) {
      return this.overrides[key] || this.object.get(key);
      // return this.objects.map(o => o.get(key)).filter(o => o)[0];
    }
  }]);

  return MetaProp;
}();




function (doc) {
  var overrides = doc.overrides || {};
  var obj = new TinyDotProp(doc);
  Object.keys(overrides).forEach(function (k) {
    var value = overrides[k];
    if(value){
      obj.set(k, value); 
    }
  });
  emit([doc._id, overrides.slug || doc.slug], obj.toObject());
};

